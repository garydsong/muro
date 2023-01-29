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

const activatedUser = {
    id: 1,
    ratePerMonth: 4
}


function activatedDateParser(users, active) {
    const currentDate = new Date();
    let total = 0;

    for (let i = 0; i < users.length; i++) {
        const customerActivationDate = users[i].activatedOn;
        const timeDifference = currentDate - customerActivationDate;
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        const monthsDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 30));
        total += active.ratePerMonth * (daysDifference / (30 * monthsDifference));
    }

    return total.toFixed(2)
}

console.log(activatedDateParser(users, activatedUser))
