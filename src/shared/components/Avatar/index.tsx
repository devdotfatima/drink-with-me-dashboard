import * as Headless from "@headlessui/react";
import clsx from "clsx";
import React, { forwardRef } from "react";
import { TouchTarget } from "../button";
import { Link } from "../link";

type AvatarProps = {
  src?: string | null;
  square?: boolean;
  initials?: string;
  alt?: string;
  className?: string;
};

export function Avatar({
  src = null,
  square = false,
  initials,
  alt = "",
  className,
  ...props
}: AvatarProps & React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="avatar"
      {...props}
      className={clsx(
        className,
        // Basic layout
        "inline-grid shrink-0 align-middle [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1",
        "outline -outline-offset-1 outline-black/[--ring-opacity] dark:outline-white/[--ring-opacity]",
        // Add the correct border radius
        square
          ? "rounded-[--avatar-radius] *:rounded-[--avatar-radius]"
          : "rounded-full *:rounded-full"
      )}
    >
      {initials && (
        <svg
          className="size-full select-none fill-current p-[5%] text-[48px] font-medium uppercase"
          viewBox="0 0 100 100"
          aria-hidden={alt ? undefined : "true"}
        >
          {alt && <title>{alt}</title>}
          <text
            x="50%"
            y="50%"
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            dy=".125em"
          >
            {initials}
          </text>
        </svg>
      )}
      {src && <img className="size-full" src={src} alt={alt} />}
    </span>
  );
}

export const AvatarButton = forwardRef(function AvatarButton(
  {
    src,
    square = false,
    initials,
    alt,
    className,
    href,
    ...props
  }: AvatarProps &
    (
      | (Omit<Headless.ButtonProps<"button">, "className"> & { href?: never })
      | (Omit<React.ComponentPropsWithoutRef<typeof Link>, "className"> & {
          href: string;
        })
    ),
  ref: React.ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
) {
  const classes = clsx(
    className,
    square ? "rounded-[20%]" : "rounded-full",
    "relative inline-grid focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500"
  );

  if (href) {
    // Render `Link` when `href` is provided
    return (
      <Link
        {...(props as Omit<
          React.ComponentPropsWithoutRef<typeof Link>,
          "className"
        >)}
        href={href}
        className={classes}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
      >
        <TouchTarget>
          <Avatar src={src} square={square} initials={initials} alt={alt} />
        </TouchTarget>
      </Link>
    );
  }

  // Render `Headless.Button` otherwise
  return (
    <Headless.Button
      {...(props as Headless.ButtonProps<"button">)}
      className={classes}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      <TouchTarget>
        <Avatar src={src} square={square} initials={initials} alt={alt} />
      </TouchTarget>
    </Headless.Button>
  );
});
