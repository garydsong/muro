# Orum technical

Thank you for taking the time to look this over!

If my memory serves me correctly, my recreation of the code follows pretty similarly to the code that was given on Woven.

We are given a 'users' array containing two objects of users:

```
const users = [
    {
        id: 1,
        name: "user1",
        customer_id: 1,
        activatedOn: new Date('December 17, 2019'),
        deactivatedOn: null
    },
    {
        id: 2,
        name: "user2",
        customer_id: 1,
        activatedOn: new Date('October 17, 2019'),
        deactivatedOn: null
    }
]
```

And an 'activatedUser' object containing the customer's ID and rate per month:
 
```
const activatedUser = {
    id: 1,
    ratePerMonth: 4
}
```

The other case gives us a 'users2' array containing three objects of users with different activation status:

```
const users2 = [
    {
        id: 1,
        name: "user1",
        customer_id: 2,
        activatedOn: new Date('December 17, 2019'),
        deactivatedOn: null
    },
    {
        id: 2,
        name: "user2",
        customer_id: 2,
        activatedOn: new Date('October 17, 2020'),
        deactivatedOn: new Date('October 17, 2021')
    },
    {
        id: 3,
        name: "user3",
        customer_id: 2,
        activatedOn: new Date('June 23, 2009'),
        deactivatedOn: new Date('October 17, 2018')
    }

]
```

And an 'activatedUser2' object containing the customer's ID and rate per month:
```
const activatedUser2 = {
    id: 2,
    ratePerMonth: 5
}
```

We are given a 'users3' array containing one object of a user with no activation:
```
const users3 = [
    {
        id: 1,
        name: "user1",
        customer_id: 3,
        activatedOn: null,
        deactivatedOn: null
    }
]
```

And an 'activatedUser3' object containing the customer's ID and rate per month:
```
const activatedUser3 = {
    id: 3,
    ratePerMonth: null
}
```

The code defines a function 'activatedDateParser' taking in the two arguments of 'users' and 'active' expecting the said array and object. We establish a current date variable seeing as we are checking up to our current date (given they do not have a deactivated date). Trivially, we loop over the users array to access each activation date. If the [i]th user does not have an activatedOn date OR a ratePerMonth, we return '0.00'. If there is no deactivation date we know that these are currently active accounts and we can caluclate the difference between these two in milliseconds, which is then divided by the number of milliseconds in a day to get the number of days, and divided by the number of milliseconds in a month. The rate per month is specified by the 'active' object argument. By trivially keying into the object's value via 'active.ratePerMonth' we can dynamically get the monthly rate. We now can add to the total amount owed and calculate it by multiplying the rate per month by the ratio of days to months. Return the total invoking the '.toFixed(2)' function to display only 2 decimals.

```
function activatedDateParser(users, active) {
    const currentDate = new Date();
    let total = 0;

    for (let i = 0; i < users.length; i++) {
        if (!users[i].activatedOn || !active.ratePerMonth) return '0.00'
        if (!users[i].deactivatedOn) {
            const customerActivationDate = users[i].activatedOn;
            const timeDifference = currentDate - customerActivationDate;

            const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            const monthsDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 30));

            total += active.ratePerMonth * (daysDifference / (30 * monthsDifference));
        } else {
            const customerActivationDate = users[i].activatedOn;
            const customerDeactivationDate = users[i].deactivatedOn;

            const timeDifference = customerDeactivationDate - customerActivationDate;
            const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            const monthsDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 30));

            total += active.ratePerMonth * (daysDifference / (30 * monthsDifference));
        }
    }
    return total.toFixed(2)
}
```

These are the test cases I've run:

```
console.log(activatedDateParser(users, activatedUser)) // 7.91
console.log(activatedDateParser(users2, activatedUser2)) // 14.65
console.log(activatedDateParser(users3, activatedUser3)) // 0.00
```
