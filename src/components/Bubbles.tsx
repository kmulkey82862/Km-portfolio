/** The glossy Web Deva bubble cluster, sized in em so it scales with the wordmark beside it. */
export default function Bubbles() {
  return (
    <span className="bubbles" aria-hidden="true">
      <i className="bubbles__lg" />
      <i className="bubbles__md" />
      <i className="bubbles__sm" />
    </span>
  );
}

export function WebDevaMark() {
  return (
    <span className="wdmark">
      web deva
      <Bubbles />
    </span>
  );
}
