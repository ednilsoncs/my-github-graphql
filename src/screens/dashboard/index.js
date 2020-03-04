import "./style.css";
import React, { useState, useCallback } from "react";
import gql from "graphql-tag";
import { debounce } from "lodash";
import { apollo } from "../../services";

function Main(props) {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState({ edges: [] });
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
      setRepository(data.node);
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
      setSearch(data.search);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelayedInput = useCallback(
    debounce(onFetchSearchGithub, 500),
    []
  );
  return (
    <div>
      <input
        placeholder="Search"
        value={value}
        onChange={e => {
          handleDelayedInput(e.target.value);
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          onFetchSearchGithub(value);
        }}
        type="button"
      >
        SEARCH
      </button>
      <div className="geral">
        <div className="coluna_esquerda">
          {search.edges.map(e => (
            <button
              key={e.node.id}
              className="button_result"
              type="button"
              onClick={() => onFetchSearchUsignID(e.node.id)}
            >
              <span>{e.node.name}</span>
            </button>
          ))}
        </div>
        <div className="coluna_direita">
          <span>O repostorio: {repository.name}</span>
          <br />
          <span>ID: {repository.id}</span>
          <br />
          <span>URL: {repository.url}</span>
        </div>
      </div>
    </div>
  );
}

export default Main;
