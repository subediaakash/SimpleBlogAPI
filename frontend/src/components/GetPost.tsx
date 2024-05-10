import React from "react";

const GetPost = ({ props }: any) => {
  return (
    <div>
      {props.map((prop: any) => {
        return (
          <React.Fragment key={prop.id}>
            <h2>{prop.title}</h2>
            <h3>{prop.content}</h3>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default GetPost;
