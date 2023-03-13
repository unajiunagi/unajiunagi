---
to: src/components/<%= path %>/<%= name %>.tsx
---
import { chakra } from "@chakra-ui/react"
import React from "react"

type Props = {}

export const <%= name %> = ({ ...props }: Props) => {
  return (
    <>
      <h2>Demo!!!</h2>
    </>
  )
}
