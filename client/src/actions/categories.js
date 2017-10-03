/* In this page Import the API needed to fetch data from the server,
as well as the categories.
*/
import api from '../utils/api'


export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

// API server call
export function fetchCategoriesAsync () {
  return dispatch =>
    api
      .get(`/categories`)
      .then(response => response.data)
      .then(
        data => dispatch(fetchCategories(data.categories)),
        error => console.error(error)
      )
}

// Action creation to fetch categories in the database
function fetchCategories (data) {
  return {
    type: FETCH_CATEGORIES,
    data}
}
