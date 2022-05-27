import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { h, Fragment } from "preact";
import "@algolia/autocomplete-theme-classic";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
import { InstantSearch, connectSearchBox } from "react-instantsearch-dom";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import qs from "qs";
import { autocomplete } from "@algolia/autocomplete-js";
//components
import Nav from "./Nav.js";
import Footer from "./Footer";
import { Autocomplete } from "./Autocomplete";

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
        query_by : "中文品名, 英文品名, 主成分略述",
        facet_by : "劑型, 藥品類別, 管制藥品分類級別, 製造廠國別, 許可證種類"
    },
} );

const searchClient = typesenseInstantsearchAdapter.searchClient;

function createURL( searchState ) {
    return qs.stringify( searchState, { addQueryPrefix : true } );
}

function searchStateToUrl( { location }, searchState ) {
    if ( Object.keys( searchState ).length === 0 ) {
        return "";
    }

    // Remove configure search state from query parameters
    const { configure, ...rest } = searchState;
    return `${location.pathname}${createURL( rest )}`;
}

function urlToSearchState( { search } ) {
    return qs.parse( search.slice( 1 ) );
}

const VirtualSearchBox = connectSearchBox( () => null );

function ProductItem( { hit, components } ) {
    return (
        <a href={hit.url} className="aa-ItemLink">
            <div className="aa-ItemContent">
                <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">
                        <components.Snippet hit={hit} attribute="中文品名" />
                    </div>
                    <div className="aa-ItemContentDescription">
                        <strong>{hit.英文品名}</strong>
                    </div>
                    <div className="aa-ItemContentDescription" style={{ color : "#000" }}>
                        <strong>${hit.許可證字號}</strong>
                    </div>
                </div>
            </div>
            <div className="aa-ItemActions">
                <button
                    className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                    type="button"
                    title="Select"
                    style={{ pointerEvents : "none" }}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                    </svg>
                </button>
                <button
                    className="aa-ItemActionButton"
                    type="button"
                    title="Add to cart"
                    onClick={( event ) => {
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M19 5h-14l1.5-2h11zM21.794 5.392l-2.994-3.992c-0.196-0.261-0.494-0.399-0.8-0.4h-12c-0.326 0-0.616 0.156-0.8 0.4l-2.994 3.992c-0.043 0.056-0.081 0.117-0.111 0.182-0.065 0.137-0.096 0.283-0.095 0.426v14c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h14c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-14c0-0.219-0.071-0.422-0.189-0.585-0.004-0.005-0.007-0.010-0.011-0.015zM4 7h16v13c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-14c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707zM15 10c0 0.829-0.335 1.577-0.879 2.121s-1.292 0.879-2.121 0.879-1.577-0.335-2.121-0.879-0.879-1.292-0.879-2.121c0-0.552-0.448-1-1-1s-1 0.448-1 1c0 1.38 0.561 2.632 1.464 3.536s2.156 1.464 3.536 1.464 2.632-0.561 3.536-1.464 1.464-2.156 1.464-3.536c0-0.552-0.448-1-1-1s-1 0.448-1 1z" />
                    </svg>
                </button>
            </div>
        </a>
    );
}


const DuplicatePage = () => {
    
    const [ searchState, setSearchState ] = useState( () =>
        urlToSearchState( window.location )
    );
    const timerRef = useRef( null );
    
    useEffect( () => {
        clearTimeout( timerRef.current );

        timerRef.current = setTimeout( () => {
            window.history.pushState(
                searchState,
                null,
                searchStateToUrl( { location : window.location }, searchState )
            );
        }, 400 );
    }, [ searchState ] );

    const onSubmit = useCallback( ( { state } ) => {
        setSearchState( ( searchState ) => ( {
            ...searchState,
            query : state.query,
        } ) );
    }, [] );
    const onReset = useCallback( () => {
        setSearchState( ( searchState ) => ( {
            ...searchState,
            query : "",
        } ) );
    }, [] );

    const plugins = useMemo( () => {
        const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin( {
            key : "search",
            limit : 5,
            transformSource( { source } ) {
                return {
                    ...source,
                    onSelect( { item } ) {
                        setSearchState( ( searchState ) => ( {
                            ...searchState,
                            query : item.label,
                        } ) );
                    },
                };
            },
        } );

        const querySuggestionsPlugin = createQuerySuggestionsPlugin( {
            searchClient,
            indexName : "undischarged",
            getSearchParams() {
                return recentSearchesPlugin.data.getAlgoliaSearchParams( {
                    hitsPerPage : 6,
                } );

            },
            categoryAttribute : [
                "undischarged",
                "facets",
                "exact_matches",
            ],
            transformSource( { source } ) {
                return {
                    ...source,
                    sourceId : "querySuggestionsPlugin",
                    onSelect( { item } ) {
                        setSearchState( ( searchState ) => ( {
                            ...searchState,
                            query : item.query,
                        } ) );
                    },
                    getItems( params ) {
                        if ( !params.state.query ) {
                            return [];
                        }
                        return source.getItems( params );
                    },
                    templates : {
                        ...source.templates,
                        header() {
                            return (
                                <Fragment>
                                    <span className="aa-SourceHeaderTitle">Drug Name</span>
                                    <div className="aa-SourceHeaderLine" />
                                </Fragment>
                            );
                        },
                        item( { item, components } ) {
                            return (
                                <ProductItem
                                    hit={item}
                                    components={components}
                                />
                            );
                        },
                        noResults() {
                            return "There were no matches to your query";
                        },
                    },
                };
            },
        } );

        return [
            recentSearchesPlugin,
            querySuggestionsPlugin,
        ];
    }, [ searchState ] );
    
    return(
        <>
            <Nav/>
            <div className="pt-20 bg-sky-100 z-0">
                <InstantSearch 
                    searchClient={searchClient}
                    indexName="undischarged"
                    searchState={searchState}
                    onSearchStateChange={setSearchState}
                    createURL={createURL}
                >
                    <div className="pt-20 bg-sky-100 z-0 flex">       
                        <div className="relative">
                            <VirtualSearchBox />
                            <Autocomplete
                                placeholder="請輸入藥名"
                                detachedMediaQuery="none"
                                initialState={{
                                    query : searchState.query,
                                }}
                                openOnFocus={true}
                                onSubmit={onSubmit}
                                onReset={onReset}
                                plugins={plugins}
                            />
                        </div>              
                    </div>            
                </InstantSearch>                
            </div>
            <div className="my-10 flex w-full justify-around">
                <div className="w-[45%] h-72 border-stone-300 border-4 border-solid rounded-md"></div>
                <div className="w-[45%] h-72 border-stone-300 border-4 border-solid rounded-md"></div>
            </div>
            <Footer/>
        </>
    );
};


export default DuplicatePage;