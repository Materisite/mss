    $(() => {
      let yearNow = (new Date()).getFullYear();
      $("#yearNow").html(yearNow);
      $("body").on('click', '#calculate', function (e) {
        let redeposit = false;
        if ($("#redeposit").is(":checked")) {
          redeposit = true;
        }
        let profit = parseInt($("#profit").val());
        let months = parseInt($("#months").val());
        let deposit = parseInt($("#deposit").val());
        let risk = parseInt($("#risk").val());
        let stoploss = parseInt($("#stoploss").val());
        let total = 0;
        let growth = 0;
        let riskUsd = 0;
        let riskLot = 0;
        let string = `<table class='table table-bordered table-striped'>
          <thead>
            <th>Month</th>
            <th>Initial</th>
            <th>Deposit</th>
            <th>Risk per trade</th>
            <th>Micro Lot ${stoploss} pips SL</th>
            <th>Profit</th>
            <th>Total</th>
          </thead>
          <tbody>`;
        for (let i = 0; i < months; i++) {
          string += "<tr>";
          string += `<td>${i + 1}</td>`;
          string += `<td>$ ${total.toFixed(2)}</td>`; // initial
          if (i == 0) {
            total += deposit;
          }
          if (redeposit && i > 0) {
            total += deposit;
          }

          if (!redeposit && i > 0) {
            deposit = 0;
          }

          riskUsd = total * (risk / 100);
          riskLot = (riskUsd / stoploss) * 10;
          string += `<td>$ ${deposit}</td>`; // deposit
          string += `<td>$ ${riskUsd.toFixed(2)}</td>`; // riskUsd
          string += `<td>Lot ${riskLot.toFixed(2)}</td>`; // riskLot
          growth = total * (profit / 100);
          string += `<td>$ ${growth.toFixed(2)}</td>`; // profit
          total += total * (profit / 100);
          string += "<td>$ " + total.toFixed(2) + "</td></tr>"; // total
        }
        string += `</tbody></table>`;
        $("#resultprof").html(string);
      })
    })