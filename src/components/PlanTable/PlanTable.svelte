<script>
  export let bills = [];

  console.log("bills", bills);

  $: billType = bills.length > 0 ? bills[0].billType : "annual";
</script>

<div class="table-container">
  <table>
    <tr>
      <th>Plan</th>
      <th>Rates</th>
      <th>Cost (per {billType === "annual" ? "year" : "month"})</th>
    </tr>
    {#each bills as bill}
      <tr>
        <td>{bill.planDisplay}</td>
        <td>fill in rate details</td>
        <td>{billType === "annual" ? bill.annualBill : bill.monthlyBill}</td>
      </tr>
    {/each}
  </table>
</div>

<style>
  .table-container {
    width: 100%;
  }

  th {
    font-family: "Roboto Condensed";
    font-weight: 300;
    font-size: 1.6rem;
    border: 1px solid black;
    border-collapse: collapse;
    text-align: left;
  }

  td {
    padding: 10px 0px;
  }

  table {
    width: 100%;
    border: 1px solid black;
    border-collapse: collapse;
  }

  .plan {
    width: 100px;
    height: 50px;
    padding: 10px;
    margin: 10px;
    background-color: aqua;
  }
</style>
