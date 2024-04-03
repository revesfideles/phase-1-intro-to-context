// Your code here
function createEmployeeRecord(employeeArray) {
    const employeeRecord = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };

    return employeeRecord;
}

function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(employeeArray => createEmployeeRecord(employeeArray));
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const date = dateStamp.slice(0, 10);
    const hour = dateStamp.slice(11);

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const date = dateStamp.slice(0, 10);
    const hour = dateStamp.slice(11);

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (!timeInEvent || !timeOutEvent) {
      throw new Error("Missing timeIn or timeOut event for the specified date");
    }
  
    const timeInHour = parseInt(timeInEvent.hour);
    const timeOutHour = parseInt(timeOutEvent.hour);
  
    const hoursWorked = (timeOutHour - timeInHour) / 100; // Convert to decimal
  
    return hoursWorked;
  }

  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    console.log("hoursWorked:", hoursWorked);
  
    const amountOwed = hoursWorked * employeeRecord.payPerHour;
    console.log("amountOwed:", amountOwed);
  
    return amountOwed;
  }
  function allWagesFor(employeeRecord) {
    const workedDates = employeeRecord.timeInEvents.reduce((dates, timeInEvent) => {
      const matchingTimeOutEvent = employeeRecord.timeOutEvents.find(timeOutEvent => timeOutEvent.date === timeInEvent.date);
  
      if (matchingTimeOutEvent) {
        dates.push(timeInEvent.date);
      }
  
      return dates;
    }, []);
  
    const totalPayOwed = workedDates.reduce((total, date) => {
      const wages = wagesEarnedOnDate(employeeRecord, date);
      return total + wages;
    }, 0);
  
    return totalPayOwed;
  }

  function calculatePayroll(employeeRecords) {
    const totalPayOwed = employeeRecords.reduce((total, employeeRecord) => {
      const wages = allWagesFor(employeeRecord);
      return total + wages;
    }, 0);
  
    return totalPayOwed;
  }