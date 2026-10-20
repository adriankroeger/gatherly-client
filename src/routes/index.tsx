import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
  component: HelloWorldComponent
});

function HelloWorldComponent (){
  return (
    <div>Hello World</div>
  );
};