import React, { useState } from "react";
import gql from "graphql-tag";
import { apollo } from "../../services";

function Main(props) {
  const [state, setState] = useState({});
  const GET_EXEMPLE = gql`
    query FindIssueID {
      repository(owner: "octocat", name: "Hello-World") {
        issue(number: 349) {
          id
        }
      }
    }
  `;
  const onFetchGithub = async () => {
    const result = await apollo.query({
      query: GET_EXEMPLE
    });
    return result;
  };
  return (
    <dev>
      {console.log(onFetchGithub())}
      <span>Logado</span>
    </dev>
  );
}

export default Main;
