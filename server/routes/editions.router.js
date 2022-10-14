const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    const workRoute = req.query.workroute;

    axios.get(`https://openlibrary.org/works/${workRoute}/editions.json`)
    .then((editions => {
      console.log('?????', editions.data.entries);

      let editionsArray = editions.data.entries;

      // Function to order by year, ascending
      function compare( a, b ) {
        // Ignore all undefined values, they will break splice and replace
        if (a.publish_date != undefined && b.publish_date != undefined ) {
        
          // The date strings come in many, many formats
          // So some logic is needed. First, extract only the numbers

          let compareATemp = a.publish_date.replace(/\D+[-]/g, '');
          let compareA =  a.publish_date.replace(/\D+[-]/g, '');
          let compareBTemp = b.publish_date.replace(/\D+[-]/g, '');
          let compareB = b.publish_date.replace(/\D+[-]/g, '');

          // Then, get only the year
          compareA = Number(compareATemp.slice(-4));
          compareB = Number(compareBTemp.slice(-4));

          // Check in case year is at the beginning of the string rather than the end
          if (compareA < 1900 || compareA > 2023) {
            compareA = Number(compareATemp.slice(4));
          }
          if (compareB < 1900 || compareB > 2023) {
            compareB = Number(compareBTemp.slice(4));
          }
          
          // Then, compare
          console.log(compareA, compareB)
          if (compareA < compareB){
            return -1;
          }
          if (compareB < compareA){
            return 1;
          }
          return 0;
        }
      }

      // for (i = 0; i < editionsArray.length; i++) {
      //   for (j = 0; j < (editionsArray.length - i - 1); j++) {
      //     let compare1 = (editionsArray[j].publish_date)?.slice(-4);
      //     let compare2 = (editionsArray[j + 1].publish_date)?.slice(-4);
      //     console.log(compare1, compare2)
      //     if (Number(compare1) > Number(compare2)) {
      //       let temporary = editionsArray[j];
      //       editionsArray[j] = editionsArray[j + 1];
      //       editionsArray[j + 1] = temporary;
      //     }
      //   }
      // }

      editionsArray.sort(compare);

      res.send(editionsArray);
    }))
    .catch((error => {
      console.log('/api/editions GET Error', error);
    }));
})

module.exports = router;