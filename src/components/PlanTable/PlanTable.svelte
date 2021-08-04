<script>
  import Icon from "components/common/Icon.svelte";
  import { tooltip } from "components/common/tooltip.js";
  import * as d3 from "d3";

  export let bills = [];
  export let plans = {};
  export let planDefs;

  let tooltipText = "324";

  $: billType = bills.length > 0 ? bills[0].billType : "annual";
  $: bills = bills.map(d => {
    const amount = d.billType === "annual" ? d.annualBill : d.monthlyBill;

    // add the rate details and tooltip for each plan
    let rates = [];
    let planTooltip;
    if (Object.keys(plans).length > 0) {
      const planRates = plans[d.plan];
      switch (d.plan) {
        case "netMetering":
          rates = [
            `<i>import:</i> <span class="rate-text">${d3.format(".1f")(
              planRates.import * 100
            )}¢</span>`,
            `<i>export:</i> <span class="rate-text">${d3.format(".1f")(
              planRates.export * 100
            )}¢</span>`,
          ];
          planTooltip = planDefs.find(p => p.plan === "1:1 Buyback").definition;
          break;
        case "noBuyback":
          rates = [
            `<i>import:</i> <span class="rate-text">${d3.format(".1f")(
              planRates.import * 100
            )}¢</span>`,
            ``,
          ];
          planTooltip = planDefs.find(p => p.plan === "No Buyback").definition;
          break;
        case "freeNights":
          rates = [
            `<i>import:</i> <span class="rate-text">${d3.format(".1f")(
              planRates.import * 100
            )}¢</span>`,
            `9am-9pm`,
          ];
          planTooltip = planDefs.find(p => p.plan === "Free Nights").definition;
          break;
      }
    }
    return {
      ...d,
      amount,
      rates,
      planTooltip,
    };
  });
</script>

<div class="table-container">
  <table>
    <tr>
      <th>Plan</th>
      <th>Rates (per kWh)</th>
      <th>Cost (per {billType === "annual" ? "year" : "month"})</th>
    </tr>
    {#each bills as bill}
      <tr class="plan-row {!bill.isCheapest ? 'faded' : ''}">
        <td class="plan-cell ">
          <div class="plan-container">
            <div
              class="help-icon-container"
              use:tooltip={{
                content: bill.planTooltip,
                allowHTML: true,
                placement: "top-end",
                delay: [250, 100],
                theme: "solarUnited",
                arrow: false,
              }}
            >
              <Icon
                hoverable="true"
                name="help-circle"
                width="15px"
                height="20px"
                stroke="var(--dGray)"
                strokeWidth={2}
              />
            </div>
            <div class="_body-text-bold">
              {bill.planDisplay}
            </div>
          </div>
        </td>

        <td class="rate-cell">
          {#each bill.rates as rateLine}
            <div>{@html rateLine}</div>
          {/each}
        </td>

        <td class="amount-cell ">
          <div class="amount-container {bill.isCheapest ? 'cheapest' : ''}">
            {d3.format("$,.0f")(bill.amount)}
          </div>
        </td>
      </tr>
    {/each}
  </table>
</div>

<style lang="scss">
  .table-container {
    width: 100%;
  }

  th {
    font-family: "Roboto Condensed";
    font-weight: 700;
    font-size: 1.2rem;
    text-transform: uppercase;
    border-collapse: collapse;
    text-align: left;
    padding: 3px 0px;
    &:first-of-type {
      padding: 10px 10px;
    }
  }

  td {
    padding: 10px 0px;
    vertical-align: middle;

    &:first-of-type {
      padding: 10px 10px;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    padding-left: 10px;
  }

  .faded {
    opacity: 0.3;
  }

  .plan-row {
    width: 100px;
    height: 50px;
    padding: 10px;
    margin: 10px;
    border-top: solid 1px var(--dGray);

    &:last-of-type {
      border-bottom: solid 1px var(--dGray);
    }
  }

  .plan-cell {
    .plan-container {
      display: flex;
      align-items: center;
    }

    .help-icon-container {
      cursor: pointer;
    }

    * {
      padding-right: 5px;
    }
  }

  .rate-cell {
    :global(.rate-text) {
      font-weight: bold;
    }
  }

  .amount-cell {
    text-align: center;
    display: flex;
    align-items: center;

    .amount-container {
      padding: 5px 10px;
      font-family: "Roboto";
      font-style: normal;
      font-weight: 700;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &.cheapest {
        background: linear-gradient(
          60deg,
          var(--dOrange) 0%,
          var(--orange) 80%,
          var(--orange) 100%
        );
        border-radius: 5px;
        color: var(--white);
        border: solid 1px var(--white);
        box-shadow: 3px 3px 5px rgb(0, 0, 0, 0.1);
      }
    }
  }
</style>
