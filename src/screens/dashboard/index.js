import React, { useState } from "react";
import gql from "graphql-tag";
import { apollo } from "../../services";

function Main(props) {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState({});
  const [repository, setRepository] = useState("");
  const GET_REPOSITORY_USING_ID = gql`
    query searchRepositoryUsingID($id: ID!) {
      node(id: $id) {
        ... on Repository {
          id
          url
          name
          descriptionHTML
        }
      }
    }
  `;
  const GET_SEARCH_REPOSITORY = gql`
    query SearchRepository($queryString: String!) {
      search(query: $queryString, type: REPOSITORY, first: 100) {
        repositoryCount
        edges {
          node {
            ... on Repository {
              id
              name
            }
          }
        }
      }
    }
  `;
  const onFetchSearchUsignID = async id => {
    try {
      const { data } = await apollo.query({
        query: GET_REPOSITORY_USING_ID,
        variables: { id }
      });
      setRepository(data);
    } catch (e) {
      console.log(e);
    }
  };
  const onFetchSearchGithub = async queryString => {
    try {
      const { data } = await apollo.query({
        query: GET_SEARCH_REPOSITORY,
        variables: { queryString }
      });
      setSearch(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <input
        placeholder="Search"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
        onClick={() => {
          onFetchSearchUsignID("MDEwOlJlcG9zaXRvcnkyMDM0MDIz");
          onFetchSearchGithub(value);
        }}
        type="button"
      >
        SEARCH
      </button>
    </div>
  );
}

export default Main;
