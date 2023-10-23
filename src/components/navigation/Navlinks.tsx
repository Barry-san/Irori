import { Link } from "react-router-dom";
type navlinkProps = {
  links: { path: string; title: string }[];
};
export function Navlinks({ links }: navlinkProps) {
  return (
    <>
      {links.map((link) => (
        <Link to={link.path} key={link.title}>
          <span className="">{link.title}</span>
        </Link>
      ))}
    </>
  );
}
