# airtable-json

A clean way to get Airtable data into JavaScript.

## Motivation

This library exists to serve people with the following situation:

- You've got data in an Airtable base
- You want that data in your JavaScript code
- You don't want the data wrapped in a `fields` object
- You don't want to re-request all the data... you want it all in a single `await`
- You want the abilty to join foreign-key table relationships into a nested json objects

## Installation

`npm install airtable-json`

## Usage

```
import airtableJson from 'airtable-json'

const videos = await airtableJson({
  auth_key, // this is your airtable api key, starting with 'key'
  base_name, // this is the base api key, which starts with 'app'
  primary: "Videos", // this is the table name you want to pull
  view: "Main" // this is the view you want to pull
})

console.log(videos)

```

will result in something like:

```
[
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
```

## But wait, there's more!

If your records have references to other tables in the same base, you can get a nice clean json blob
with that data included.

```
const videos = await airtableJson({
  auth_key,
  base_name,
  primary: 'Videos',
  view: 'Main',
  populate: [{
    local: "Topics", // column name of the primary table specified a few lines up
    other: "Topics" // table name of the other table in the same base
  }]
})
```

will result in something like this:

```
[
  {
    Status: "Idea",
    Slug: "reasons-why",
    Title: "Reasons cats should go to space",
    Topics: [
      {
        Name: "Outer Space",
        Slug: "outer-space",
        Sources: ["recrCOfFWabGD9Ra7", "recHOaZU1S0gEuGBB"],
        Videos: ["rec4C6DnxuaLAMFaH", "recA1HSocBLB5G7CZ"],
        Summary:
          "Outer space, commonly shortened to space, is the expanse that exists beyond Earth and its atmosphere and between celestial bodies. Outer space is not completely empty—it is a hard vacuum containing a low density of particles, predominantly a plasma of hydrogen and helium, as well as electromagnetic radiation, magnetic fields, neutrinos, dust, and cosmic rays. The baseline temperature of outer space, as set by the background radiation from the Big Bang, is 2.7 kelvins (−270.45 °C; −454.81 °F).[1] The plasma between galaxies is thought to account for about half of the baryonic (ordinary) matter in the universe, having a number density of less than one hydrogen atom per cubic metre and a temperature of millions of kelvins.[2] Local concentrations of matter have condensed into stars and galaxies. Studies indicate that 90% of the mass in most galaxies is in an unknown form, called dark matter, which interacts with other matter through gravitational but not electromagnetic forces.[3][4] Observations suggest that the majority of the mass-energy in the observable universe is dark energy, a type of vacuum energy that is poorly understood.[5][6] Intergalactic space takes up most of the volume of the universe, but even galaxies and star systems consist almost entirely of empty space.",
        __id: "recRX8ZBZ7i9pS1Kx"
      }
    ],
    __id: "rec4C6DnxuaLAMFaH"
  },
  {
    Status: "First Draft",
    Slug: "zero-g",
    Title: "Effects of zero-G on felines",
    Topics: [
      {
        Name: "Outer Space",
        Slug: "outer-space",
        Sources: ["recrCOfFWabGD9Ra7", "recHOaZU1S0gEuGBB"],
        Videos: ["rec4C6DnxuaLAMFaH", "recA1HSocBLB5G7CZ"],
        Summary:
          "Outer space, commonly shortened to space, is the expanse that exists beyond Earth and its atmosphere and between celestial bodies. Outer space is not completely empty—it is a hard vacuum containing a low density of particles, predominantly a plasma of hydrogen and helium, as well as electromagnetic radiation, magnetic fields, neutrinos, dust, and cosmic rays. The baseline temperature of outer space, as set by the background radiation from the Big Bang, is 2.7 kelvins (−270.45 °C; −454.81 °F).[1] The plasma between galaxies is thought to account for about half of the baryonic (ordinary) matter in the universe, having a number density of less than one hydrogen atom per cubic metre and a temperature of millions of kelvins.[2] Local concentrations of matter have condensed into stars and galaxies. Studies indicate that 90% of the mass in most galaxies is in an unknown form, called dark matter, which interacts with other matter through gravitational but not electromagnetic forces.[3][4] Observations suggest that the majority of the mass-energy in the observable universe is dark energy, a type of vacuum energy that is poorly understood.[5][6] Intergalactic space takes up most of the volume of the universe, but even galaxies and star systems consist almost entirely of empty space.",
        __id: "recRX8ZBZ7i9pS1Kx"
      },
      {
        Name: "Weightlessness",
        Slug: "weightlessness",
        Sources: ["recMmq77JJyrYtzkU"],
        Videos: ["recA1HSocBLB5G7CZ"],
        Summary:
          'Weightlessness is the complete or near-complete absence of the sensation of weight. This is also termed zero-G, although the more correct term is "zero G-force". It occurs in the absence of any contact forces upon objects including the human body.',
        __id: "recMmlCVKO4uWKEIc"
      }
    ],
    __id: "recA1HSocBLB5G7CZ"
  },
  {
    Status: "Publish",
    Slug: "ancient-egypt",
    Title:
      "Ancient Egypt's obsession with cats, and what it means for putting cats in space",
    Topics: [
      {
        Name: "Ancient Egypt",
        Slug: "ancient-egypt",
        Sources: ["rec9sZ1QrOMAP0vPO"],
        Videos: ["recf7Miu2yYYqb2p9"],
        Summary:
          "Ancient Egypt was a civilization of ancient Africa, concentrated along the lower reaches of the Nile River, situated in the place that is now the country Egypt. Ancient Egyptian civilization followed prehistoric Egypt and coalesced around 3100 BC (according to conventional Egyptian chronology)[1] with the political unification of Upper and Lower Egypt under Menes (often identified with Narmer).[2] The history of ancient Egypt occurred as a series of stable kingdoms, separated by periods of relative instability known as Intermediate Periods: the Old Kingdom of the Early Bronze Age, the Middle Kingdom of the Middle Bronze Age and the New Kingdom of the Late Bronze Age.\n\n",
        __id: "recK4izMl1yAh7Ewd"
      }
    ],
    __id: "recf7Miu2yYYqb2p9"
  }
]
```

## Populate Arguments

Populate accepts an object for its args.

| Arg     | Type    | Description                                                 |
| ------- | ------- | ----------------------------------------------------------- |
| local   | string  | column name of the primary table                            |
| other   | string  | table name of the matched data                              |
| flatten | boolean | transform from array to object, comprised of the first item |
| as      | string  | rename the populated field to a different name              |

## Todo

- Recursive populate
- when declaring populate, can just pass in one name if they're the same
- delete backreference from populate
- one object created, ala aws-sdk, where you declare auth_key etc
- stop using 'things' as variable names, confusing
