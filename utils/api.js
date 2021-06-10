import qs from 'qs';
/**
 * Error class for an API response outside the 200 range
 *
 * Taken from @drupal/admin-ui-utilities
 *
 * @param {number} status - the status code of the API response
 * @param {string} statusText - the status text of the API response
 * @param {object} response - the parsed JSON response of the API server if the
 *  'Content-Type' header signals a JSON response
 */
export class ApiError extends Error {
  constructor(status, statusText, response) {
    super();
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.response = response;
    this.message = `${status} - ${statusText}`;
  }

  static errorToHumanString(error) {
    if (error.name === 'ApiError') {
      return ApiError.toHumanString(error);
    }
    return error.toString();
  }

  static async toHumanString(error) {
    try {
      switch (error.status) {
        case 403:
          return `You don't have access: ${
            (await error.response.json()).message
          } Maybe you aren't logged in.`;
        case 404:
          return `Some page is missing: ${
            (await error.response.json()).message
          }`;
        case 400:
          return `You posted some invalid data, contact the administration team: ${
            (await error.response.json()).message
          }`;
        case 500:
          return `The server crashed, contact the administration team: ${
            (await error.response.json()).message
          }`;
        default:
          return error.toString();
      }
    } catch (e) {
      return error.toString();
    }
  }
}

/**
 * An async helper function for making requests to a Drupal backend.
 *
 * @param {string} REACT_APP_API_URL
 *  The base url of the backend (Drupal)
 * @param {string} endpoint
 *  The name of the end point you want to use.
 * @param {Object} [settings={}]
 *  Optional settings.
 * @param {Object} [settings.queryString=null]
 *  Key value parameters to be processed into a query string.
 * @param {Object} [settings.parameters={}]
 *  Route string construction parameters.
 * @param {Object} [settings.options={}]
 *  HTTP request options.
 * @return {Promise}
 *  Result of the fetch operation.
 */
export async function jsonapiClient(
  REACT_APP_API_URL,
  endpoint,
  { queryString = null, parameters = {}, options = {} } = {},
) {
  let url;
  // options.credentials = 'include';
  options.headers = options.headers || {};

  switch (endpoint) {
    case 'csrf_token':
      url = '/session/token';
      options.text = true;
      break;
    case 'products':
        url = '/jsonapi/products';
        queryString = {
          'include': 'variations,variations.field_images',
          // 'fields[product--simple]': 'title,variations',
          // 'fields[product_variation--simple]': 'price,field_images',
          // 'page[limit]': 9,
          'sort': 'title',
        }
        break;
    case 'product_single':
      url = `/jsonapi/products`
      queryString = {
        'filter[id]': parameters.id,
        // 'include':'variations,variations.field_images'
        // 'fields[file--file]': 'uri',
        // 'fields[taxonomy_term--product_categories]': 'name',
        // 'fields[taxonomy_term--special_categories]': 'name',
        // 'fields[taxonomy_term--brands]': 'name',
      };
      //const queryInclude = ['variations', 'variations.field_images', 'field_special_categories', 'field_product_categories', 'field_brand'];
      const queryInclude = ['variations', 'variations.field_images', 'field_brand'];
      // const queryVariationFields = ['sku', 'price', 'resolved_price', 'field_images'];
      const queryVariationFields = [];
      if (parameters.bundle === 'clothing') {
        queryInclude.push('variations.attribute_color', 'variations.attribute_size')
        queryVariationFields.push('attribute_color', 'attribute_size');
      }
      queryString['include'] = queryInclude.join(',');
      // queryString[`fields[commerce_product--${parameters.bundle}]`] = 'title,body,variations,field_special_categories,field_product_categories,field_brand';
      queryString[`fields[commerce_product_variation--${parameters.bundle}]`] = queryVariationFields.join(',')
      break;

    default:
      url = endpoint;
      options.headers.Accept = 'application/vnd.api+json';
      break;
  }

  const data = await fetch(
    `${REACT_APP_API_URL}${url}${
      queryString
        ? `?${qs.stringify(queryString, { arrayFormat: 'brackets' })}`
        : ''
    }`,
    options,
  ).then(res => {
    if (![200, 201, 204].includes(res.status)) {
      throw new ApiError(res.status, res.statusText, res);
    }

    // CSRF tokens return text, not json.
    if (options.text) {
      return res.text();
    }
    return res.json();
  });
  return data;
}

export function jsonapiNormalize(json) {
  const ret = {...json}
  ret.included = {};
  if (json.included) {
    const included = [...json.included];
    included.forEach(entity => {
      ret.included[entity.type] = ret.included[entity.type] || {}
      ret.included[entity.type][entity.id] = entity;
    })
  }
  return ret;
}
