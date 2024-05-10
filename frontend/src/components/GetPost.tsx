import React from "react";
import { FaRegEdit } from "react-icons/fa";

const GetPost = ({ props }: any) => {
  return (
    <div
      className="flex justify-center flex-col items-center gap-4
    "
    >
      {props.map((prop: any) => {
        return (
          <div className="w-1/3 px-5 flex flex-col gap-2">
            <React.Fragment key={prop.id}>
              <div className="flex justify-between items-center">
                {" "}
                <h2 className="text-xl font-bold">{prop.title}</h2>
                <FaRegEdit />
              </div>
              <h3 className="text-slate-500">{prop.content}</h3>
            </React.Fragment>
          </div>
        );
      })}
    </div>
  );
};

export default GetPost;
