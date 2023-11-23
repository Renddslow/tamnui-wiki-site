import { u } from "unist-builder";

export const element = new Proxy(
  {},
  {
    get: (o, k) => {
      return (props, children) => {
        const { content, ...properties } = props ?? {};
        const tagProps = {
          properties,
          tagName: k,
        };
        if (content) {
          tagProps.content = content;
        }
        return u(`element`, tagProps, children);
      };
    },
  },
);

export const text = (value) => u("text", value);
