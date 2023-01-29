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

const users3 = [
    {
        id: 1,
        name: "user1",
        customer_id: 3,
        activatedOn: null,
        deactivatedOn: null
    }
]

const activatedUser = {
    id: 1,
    ratePerMonth: 4
}

const activatedUser2 = {
    id: 2,
    ratePerMonth: 5
}

const activatedUser3 = {
    id: 3,
    ratePerMonth: null
}


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

console.log(activatedDateParser(users, activatedUser)) // 7.91
console.log(activatedDateParser(users2, activatedUser2)) // 14.65
console.log(activatedDateParser(users3, activatedUser3)) // 0.00
