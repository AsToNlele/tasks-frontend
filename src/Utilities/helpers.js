import React from 'react';
import moment from 'moment';
import {
  Skeleton,
  SkeletonSize,
} from '@redhat-cloud-services/frontend-components/Skeleton';

export const renderRunDateTime = (time) => {
  if (time === 'loading') {
    return <Skeleton size={SkeletonSize.md} />;
  } else {
    return moment.utc(time).format('DD MMM YYYY, HH:mm UTC');
  }
};

export const getTimeDiff = ([start, end, status]) => {
  if (start === 'loading') {
    return <Skeleton size={SkeletonSize.md} />;
  } else {
    return status === 'Running' || !end
      ? '-'
      : `${renderRunDateTime(end)} (${moment
          .duration(
            moment(renderRunDateTime(end), 'DD MMM YYYY, HH:mm').diff(
              moment(renderRunDateTime(start), 'DD MMM YYYY HH:mm')
            )
          )
          .asMinutes()} min)`;
  }
};

export const uniq = (collection) => [...new Set(collection)];

/*eslint-disable react/display-name*/
export const renderColumnComponent =
  (Component, props) => (_data, _id, entity) =>
    <Component {...entity} {...props} />;
/*eslint-enable react/display-name*/

const getSortable = (property, item) => {
  if (typeof property === 'function') {
    return property(item);
  } else {
    return item[property];
  }
};

export const orderArrayByProp = (property, objects, direction) =>
  objects.sort((a, b) => {
    if (direction === 'asc') {
      if (typeof a[property] === 'number') {
        return getSortable(property, a) - getSortable(property, b);
      } else {
        return String(getSortable(property, a)).localeCompare(
          String(getSortable(property, b))
        );
      }
    } else {
      if (typeof a[property] === 'number') {
        return -getSortable(property, a) + getSortable(property, b);
      } else {
        return -String(getSortable(property, a)).localeCompare(
          String(getSortable(property, b))
        );
      }
    }
  });

export const getProperty = (obj, path, fallback) => {
  const parts = path.split('.');
  const key = parts.shift();
  if (typeof obj[key] !== 'undefined') {
    return parts.length > 0
      ? getProperty(obj[key], parts.join('.'), fallback)
      : obj[key];
  }

  return fallback;
};

export const camelCase = (string) => {
  return string
    .split(/[-_\W]+/g)
    .map((string) => string.trim())
    .map((string) => string[0].toUpperCase() + string.substring(1))
    .join('');
};

export const findParameterByKey = (parameters, key) => {
  return parameters.find((param) => param.key === key);
};

export const toBool = (value) => {
  return value?.toLowerCase() === 'true' || value === '1' || value === 1;
};

export const getInputParameterType = (parameter) => {
  // if no parameter values are provided, use a textbox
  // if the parameter values are only 'true/false' or '0/1' use a checkbox
  // else use a dropdown
  if ((parameter?.values || []).length === 0) {
    return 'textbox';
  } else if (
    parameter.values.length === 2 &&
    (parameter.values.every((value) =>
      ['true', 'false'].includes(value.toLowerCase())
    ) ||
      parameter.values.every((value) => ['0', '1'].includes(value)))
  ) {
    return 'checkbox';
  } else {
    return 'dropdown';
  }
};
