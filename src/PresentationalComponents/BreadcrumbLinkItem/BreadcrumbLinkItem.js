import React from 'react';
import propTypes from 'prop-types';
import { BreadcrumbItem } from '@patternfly/react-core';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink';

const RouterLink = ({ href, ...props }) => {
  return <InsightsLink {...props} to={href} />;
};

RouterLink.propTypes = {
  href: propTypes.string,
};

const BreadcrumbLinkItem = ({ children, ...props }) => (
  <BreadcrumbItem {...props} component={RouterLink}>
    {children}
  </BreadcrumbItem>
);

BreadcrumbLinkItem.propTypes = {
  children: propTypes.node,
};

export default BreadcrumbLinkItem;
