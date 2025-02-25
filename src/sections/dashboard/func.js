export const checkData = (totalResult, temp, item, coaData) => {
    const tempResult = totalResult;
    const setTotalResult = (type) => {
      let flag = false;
      if (type) {
        if(tempResult.revenue.length > 0) {
          tempResult.revenue.forEach((revenue) => {
            if (revenue.name === item[3]) {
              revenue.value += item[2];
              flag = true;
            }
          });
        } 
        if (flag === false) tempResult.revenue.push({ name: item[3], value: item[2] });
      } else {
        if(tempResult.expense.length > 0) {
          tempResult.expense.forEach((expense) => {
            if (expense.name === item[3]) {
              expense.value += item[2];
              flag = true;
            }
          });
        }
        if (flag === false) tempResult.expense.push({ name: item[3], value: item[2] });
      }
    };
  
    if (coaData[0].toString() === item[0]) {
      switch (coaData[4]) {
        case 'Revenues':
          temp.revenue += item[2];
          totalResult = setTotalResult(true);
          break;
        case 'COGS/S&O':
          temp.cogs += item[2];
          totalResult = setTotalResult(false);
          break;
        case 'SGA':
          temp.sga += item[2];
          totalResult = setTotalResult(false);
          break;
        case 'Depreciation & Amortization':
          temp.amorization += item[2];
          totalResult = setTotalResult(false);
          break;
        default:
          break;
      }
    }
};
  
// monthly data
export const divideData = (mData, coa) => {
    const totalResult = { revenue: [], expense: []};
    const temp = { revenue: 0, cogs: 0, sga: 0, amorization: 0 };
    const missmatch = []
    mData.forEach((item) => {
      let flag = false;
      coa.map( (coaData) => {
          if(coaData[0].toString()===item[0]) {
              checkData(totalResult, temp, item, coaData)
              flag = true;
          } 
          return true 
      });
      // flag == false -> item's account id is not registered in coa table
      if(!flag) missmatch.push(item)
    });
    const resultData = {
        monthly: totalResult, eachItem: temp, missItem: missmatch
    }
    return resultData;
};
  
  // total result
export const handleValue = (data,coa) => {
    const totalResult = {Revenue:[], Expense:[], TotalRevenue:[],NetIncome:[],GrossProfit:[], missedItem:[]}
  
    const checkResult = (tempData, flag) =>{
      tempData.forEach(item => {
        let exist = true;
        if(flag === true) {
          totalResult.Revenue.map((revenue => {
            if(item.name === revenue.name){
              revenue.value += item.value;
              exist = false;
            }
            return true;
          }))
          if(exist === true) totalResult.Revenue.push(item)
        } else {
          totalResult.Expense.map(expense => {
            if(item.name === expense.name){
              expense.value += item.value;
              exist = false;
            }
            return true;
          })  
          if(exist === true) totalResult.Expense.push(item)
        }
      })
    }
  
    const addMonthlyResult = (monthlyResult, date) => {
      const {revenue, amorization, cogs, sga} = monthlyResult.eachItem
      
      const totalRevenue = revenue; 
      const netIncome= revenue - (sga+ amorization);
      const grossProfit= revenue - cogs;
      totalResult.TotalRevenue.push({year:date, value:totalRevenue})
      totalResult.NetIncome.push({year:date, value:netIncome})
      totalResult.GrossProfit.push({year:date, value:grossProfit})
      
      if(totalResult.Revenue.length === 0) {
        totalResult.Revenue.push(...monthlyResult.monthly.revenue)
      } else {
        checkResult(monthlyResult.monthly.revenue, true)
      }
  
      if(totalResult.Expense.length === 0) {
        totalResult.Expense.push(...monthlyResult.monthly.expense)
      } else {
        checkResult(monthlyResult.monthly.expense, false)
      }
    }
  
    data.forEach((item) => {
      if (item.data.length > 0 && Array.isArray(item.data)) {
        const date = item.dateFlag;
        const temp = [...item.data];
        // item.data => one month's result => It's array.
        const monthlyResult = divideData(temp, coa);
        if(monthlyResult.missItem.length > 0) totalResult.missedItem.push({item: monthlyResult.missItem, month: date});
        addMonthlyResult(monthlyResult, date);
      } else {
        console.log('empty')
      }
    });
    return totalResult
};