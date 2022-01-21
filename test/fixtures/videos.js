const resp = [
  "1f8b080000000000000385914d6f82401086ffca662fbd6003948a72f3033f82a68d9ab6d27858970526c15dca2ea168fcef5db4891e484cf630796776e67df29e70c1a8282289bdef1386087b8de08cba63fe5b92c5603921336ce01858d6cc9cf05a1155ea0acf234674679d95c9e5139182cb4e95d65adc80ca985657571551a22492a928b30825022981644e286b26450eb439de9c5d7df5c261e8423f5f5bc12fde9d0d4cf562c5a20d1c9a7db6695b1d53bfeec6ec79a6ebbdf49f4dd30cf1d9b8991f58b3b5a0c3c5f075ea8ec276f31328a442e382c4eac6706485e82477f6fd3866543b1731baf4a6487014b30c38930fbc1b8db63c64a38fe0cd293f037f4e1ff3f45a79627709a55d6fb73f7b3befb7f3bc97fb0c647a63219c02e3aac3923a57774883ab8efc467fd2687bc9a404cd55814a2f411988f00855295108143a30a2038c4581f25229e0c9354ce0ed11060e1c9799550f52d7afa287c896e939ce3ff2eefc07caddc4658d020000"
]
const json_resp = [
  {
    Status: "Idea",
    Slug: "reasons-why",
    Title: "Reasons cats should go to space",
    Topics: ["recRX8ZBZ7i9pS1Kx"],
    __id: "rec4C6DnxuaLAMFaH"
  },
  {
    Status: "First Draft",
    Slug: "zero-g",
    Title: "Effects of zero-G on felines",
    Topics: ["recRX8ZBZ7i9pS1Kx", "recMmlCVKO4uWKEIc"],
    __id: "recA1HSocBLB5G7CZ"
  },
  {
    Status: "Publish",
    Slug: "ancient-egypt",
    Title:
      "Ancient Egypt's obsession with cats, and what it means for putting cats in space",
    Topics: ["recK4izMl1yAh7Ewd"],
    __id: "recf7Miu2yYYqb2p9"
  }
]

const headers = [
  "access-control-allow-headers",
  "authorization,content-length,content-type,user-agent,x-airtable-application-id,x-airtable-user-agent,x-api-version,x-requested-with",
  "access-control-allow-methods",
  "DELETE,GET,OPTIONS,PATCH,POST,PUT",
  "access-control-allow-origin",
  "*",
  "airtable-uncompressed-content-length",
  "653",
  "content-encoding",
  "gzip",
  "Content-Type",
  "application/json; charset=utf-8",
  "Date",
  "Fri, 21 Jan 2022 16:35:52 GMT",
  "Server",
  "Tengine",
  "Set-Cookie",
  "brw=00000000000000000; path=/; expires=Sat, 21 Jan 2023 16:35:52 GMT; domain=.airtable.com; samesite=none; secure",
  "Strict-Transport-Security",
  "max-age=31536000; includeSubDomains; preload",
  "Vary",
  "Accept-Encoding",
  "X-Content-Type-Options",
  "nosniff",
  "X-Frame-Options",
  "DENY",
  "Content-Length",
  "370",
  "Connection",
  "Close"
]

export default { resp, headers, json_resp }
