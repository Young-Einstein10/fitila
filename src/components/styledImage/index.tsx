import React, { FC } from "react";
import styled from "styled-components";

type StyledImageProps = {
  width: number;
  height: number;
  rounded?: boolean;
  className?: string;
  alt: string;
  src: string;
};

type ImageProps = Pick<StyledImageProps, "width" | "height" | "rounded">;

export const StyledImage: FC<StyledImageProps> = ({
  src,
  alt,
  width,
  height,
  rounded,
  className,
  ...rest
}) => {
  return (
    <Image
      className={className}
      width={width}
      height={height}
      rounded={rounded}
      {...rest}
    >
      <img src={src} alt={alt} />
    </Image>
  );
};

const Image = styled.div<ImageProps>`
  width: ${({ width }) => `${width}px` || "30px"};
  height: ${({ height }) => `${height}px` || "30px"};

  img {
    width: 100%;
    height: auto;

    ${props =>
      props.rounded &&
      `
          border-radius: 50px;
      `}
  }
`;
