# CREB On-Demand Data Hub: Housing Snapshot (reference)

Source: "On-Demand Data Hub: Housing Snapshot Summary with Ann-Marie Lurie" (CREB Chief Economist),
https://www.youtube.com/watch?v=U998mGcFLmY (published Jun 4, 2026). Notes taken from the full transcript.

The Data Hub is members-only. Claude cannot log in, so the workflow is:
**Paul exports the table (CSV for data, PDF for reference) -> drops it in `data/` -> videos read the numbers from that file.**
Never type market numbers into a video by hand or from memory.

## Filters (top of the Snapshot)

| Filter | Options | Default / notes |
|---|---|---|
| Location | Region, district, community, search box, or click the map | Calgary |
| Property type | Total residential, detached, semi-detached, row, apartment (colour-coded) | Total residential |
| Date | Monthly, quarterly, annual, month-to-date, year-to-date | Latest full month. Quarterly/annual = latest *full* period. YTD = Jan to latest full month. MTD is partial and not every indicator is filled |
| Comparison dates | Line 1 = same period last year (fixed). Line 2 = previous period, **changeable to any date** | % changes are calculated for you |
| Price range | One or more **consecutive** ranges only | Benchmark price is blank when a range is set (benchmark exists only for all price ranges); use average/median |

CMA tip from the video: set comparison line 2 to the month the client **bought** (e.g. July 2013) to show price change since purchase.

## The indicators

| Indicator | What it is | How CREB reads it |
|---|---|---|
| **Benchmark price** | Price of a "typical" home, same type of home tracked over time | Best for trends (her preference). History back to **2005** only |
| Average price | Total $ volume / number of sales | Jumps around, small samples skew it. Not great for trends |
| Median price | Midpoint of all sales ranked low to high | More stable than average; her pick when benchmark isn't available. History back to **1990** |
| **Sales** | Sales in the period, a demand signal | Compare **year-over-year**. Strong seasonality: low Nov-Jan, rises into spring |
| New listings | Listings that came on in the period | Same strong seasonality as sales |
| Inventory | Active listings on the last day of the month | Seasonal. Compare to past cycles (e.g. not as high as 2018) |
| **Sales-to-new-listings ratio** | Sales / new listings | ~55-60%+ = balanced. ~40s% = inventory likely to build. December is always very high (90%+), so compare to same month last year. Read with inventory and months of supply, not alone |
| **Months of supply** | Inventory / sales pace: the main balance measure | **< 2 months = favours sellers. ~3 = balanced. ~4 = favours buyers.** One month isn't a trend; watch several in a row |
| Days on market | Average (not cumulative) | Use for the general trend |
| Total $ volume | All sales dollars in the period | Rarely used |
| Sales-to-list price ratio | Sale price vs list price | Narrow range; most useful at community level |

## Other features

- **Click any indicator** -> chart (default last 10 years, slider to change range, line or bar). Charts follow the date/price filters. Long histories load slowly.
- **Quick comparison** (arrow under the table): one indicator across all property types side by side. Total residential often hides very different conditions by type.
- **Pin**: pin one area/type, then pick another to compare all indicators side by side (e.g. City Centre vs a community, detached vs semi in the same area).
- **Export**: print to PDF or **export CSV**. Side search jumps to a location or an indicator.
- The old prepared stats packages and self-serve tables are still there; the Hub is in addition to them. More modules are coming.

## Screen map (from a frame-by-frame video analysis)

AI scene analysis of the 38-min video, so treat as approximate. Confirm against the live site when the login skill is built.

1. **Landing page (Data Hub home):** tiles top left: **Housing Snapshot**, **Map Comparison**, then **COMING SOON** and **SUBMIT YOUR FEEDBACK**. Right side links: *Daily view into market activity*, *CREB® provided monthly and quarterly statistical packages*, *Self Serve Data Tables*, *Understanding Stats*. Later menu items seen: **Location Comparison**, **Data Request**.
2. **Housing Snapshot** opens a grey region map (selected area highlighted orange; clicked map sectors turn blue) with a pop-up **"Summary Report: Total Residential"** box. Rows: Benchmark Price, Sales, New Listings, Inventory, Months of Supply, Days on Market, Dollar Volume, Sales/List Price ratio. Click outside the box to close it.
3. **Location:** click the location name (default **"Calgary"**) to get a dropdown and search (e.g. typing "Lakeview"). Or click a sector on the map.
4. **Property type:** click **"Total Residential"** at the top of the box for Detached / Semi-Detached / Row / Apartment.
5. **Date:** click the date (e.g. **"Apr 2026"**) to pick a month. **Growth Frequency** setting: Monthly / Quarterly / Annual / Month-To-Date / Year-To-Date, plus year, then **Save Changes**. The second comparison date is set in the same panel (e.g. July 2013).
6. **Price:** click the price filter (default **"$0 - $999,999,999"**) and tick consecutive brackets such as "$500,000 - $599,999", "$600,000 - $699,999", "$1,000,000 and above".
7. **Indicator detail:** the small **arrow next to Benchmark Price** expands to Average Price and Median Price. **Click an indicator name** for its chart (default Jan 2016 to now), a **time slider above the chart**, and a **line/bar toggle at the chart's top right** (bars are orange).
8. **Quick Comparison:** the **small arrow at the bottom right of the summary box** opens the property-type breakdown. Choose the indicator to compare, e.g. Months of Supply.
9. **Pin:** a **Pin button next to the location name**. Pin one area (e.g. City Centre), select another (e.g. West Hillhurst) and both show side by side.
10. **Menu button → Home icon** goes back to the landing page. **Print (PDF) / CSV export** is on the side controls (transcript, end of video; the visual analysis didn't capture where).

## Rules for our stats visuals

1. Year-over-year is the headline comparison. Month-over-month only with a seasonality caveat.
2. Lead with benchmark price; switch to median when a price range or a small area makes benchmark unavailable or noisy.
3. Small communities or districts mean small samples: use **quarterly or YTD** data, or widen the price range, before calling a trend.
4. Show market balance by **property type** (detached / semi / row / apartment). They often tell different stories.
5. Every stats piece names its source and period, e.g. "Source: CREB®, April 2026, total residential, City of Calgary."
6. Brand + compliance rules in `brand.css` still apply (no invented stats; superlatives watch-list).

## Example from the video (April 2026, City of Calgary; already dated, do not publish)

Total residential benchmark $568,800, down 3.46% year over year and up over March. Months of supply: detached 2.3, semi 2.5, row ~3, apartment over 4. Apartment sales-to-new-listings ratio ~46% (inventory building), total ~55% (balanced).
