import "./Breadcrumbs.less";
import React from "react";
import { Breadcrumb, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { hooksInstance } from "@utils/helpers";

export default function Breadcrumbs() {
  const router = hooksInstance.useRouter();
  const pathname = router.pathname;
  const query = router.query;
  let pathlink = [];
  const arrayPath = pathname.split("/");

  let renderLinkBreadcrumb = arrayPath.map((name, index) => {
    pathlink.push(name);
    const linkto = pathlink.join("/") + "?" + $.param(query);

    if (name === "") name = <HomeOutlined />;
    return index !== arrayPath.length - 1 ? (
      <Breadcrumb.Item key={linkto + index}>
        <Link key={linkto} to={linkto}>
          {name}
        </Link>
      </Breadcrumb.Item>
    ) : (
      <Breadcrumb.Item key={linkto + index}>
        <Typography.Text type="secondary">{name}</Typography.Text>
      </Breadcrumb.Item>
    );
  });

  return <Breadcrumb>{renderLinkBreadcrumb}</Breadcrumb>;
}
