/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {
  ReactElement,
  ReactNode,
  FocusEvent,
  KeyboardEvent,
  cloneElement,
} from 'react';

import {
  Dropdown as AntdDropdown,
  DropdownProps as AntdDropdownProps,
} from 'antd-v5';
import { styled } from '@superset-ui/core';
import { Icons } from 'src/components/Icons';

const MenuDots = styled.div`
  width: ${({ theme }) => theme.gridUnit * 0.75}px;
  height: ${({ theme }) => theme.gridUnit * 0.75}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.grayscale.light1};

  font-weight: ${({ theme }) => theme.typography.weights.normal};
  display: inline-flex;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.base};

    &::before,
    &::after {
      background-color: ${({ theme }) => theme.colors.primary.base};
    }
  }

  &::before,
  &::after {
    position: absolute;
    content: ' ';
    width: ${({ theme }) => theme.gridUnit * 0.75}px;
    height: ${({ theme }) => theme.gridUnit * 0.75}px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.grayscale.light1};
  }

  &::before {
    top: ${({ theme }) => theme.gridUnit}px;
  }

  &::after {
    bottom: ${({ theme }) => theme.gridUnit}px;
  }
`;

const MenuDotsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.gridUnit * 2}px;
  padding-left: ${({ theme }) => theme.gridUnit}px;
`;

export enum IconOrientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export interface MenuDotsDropdownProps extends AntdDropdownProps {
  iconOrientation?: IconOrientation;
}

const RenderIcon = (
  iconOrientation: IconOrientation = IconOrientation.Vertical,
) => {
  const component =
    iconOrientation === IconOrientation.Horizontal ? (
      <Icons.EllipsisOutlined iconSize="xl" />
    ) : (
      <MenuDots />
    );
  return component;
};

export const MenuDotsDropdown = ({
  overlay,
  iconOrientation = IconOrientation.Vertical,
  ...rest
}: MenuDotsDropdownProps) => (
  <AntdDropdown dropdownRender={() => overlay} {...rest}>
    <MenuDotsWrapper data-test="dropdown-trigger">
      {RenderIcon(iconOrientation)}
    </MenuDotsWrapper>
  </AntdDropdown>
);

export interface NoAnimationDropdownProps extends AntdDropdownProps {
  children: ReactNode;
  onBlur?: (e: FocusEvent<HTMLDivElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
}

export const NoAnimationDropdown = (props: NoAnimationDropdownProps) => {
  const { children, onBlur, onKeyDown, ...rest } = props;
  const childrenWithProps = cloneElement(children as ReactElement, {
    onBlur,
    onKeyDown,
  });

  return (
    <AntdDropdown autoFocus overlayStyle={props.overlayStyle} {...rest}>
      {childrenWithProps}
    </AntdDropdown>
  );
};

export type DropdownProps = AntdDropdownProps;
export const Dropdown = (props: DropdownProps) => (
  <AntdDropdown autoFocus {...props} />
);
