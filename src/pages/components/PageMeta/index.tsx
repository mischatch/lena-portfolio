import { Helmet } from "react-helmet";

interface IPageMetaProps {
  title: string;
}

export function PageMeta({ title }: IPageMetaProps) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
