import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";


//串聯全文搜尋服務
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter( {
    server : {
        apiKey : process.env.REACT_APP_TYPESENSE_APIKEY, // Be sure to use an API key that only allows search operations
        nodes : [
            {
                host : process.env.REACT_APP_TYPESENSE_HOST,
                port : "443",
                protocol : "https",
            },
        ],
        cacheSearchResultsForSeconds : 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
    },
    additionalSearchParameters : {
        query_by : "中文品名, 英文品名, 主成分略述, 許可證字號",
        facet_by : "劑型, 藥品類別, 管制藥品分類級別, 製造廠國別, 許可證種類"
    },
} );
const searchClient = typesenseInstantsearchAdapter.searchClient;

export default searchClient;