const body = document.querySelector("body")

const request = async () => {
    try {
        const res = await fetch('http://localhost:3000/bfghstbfhsnggfdhbsahgsefbdahsgefhsggsvvegeg');
        return await res.json();
    } catch (e) {
        return console.log(e);
    }
}

const calculateCourierAmounts = async () => {
    const couriers = await request()
    couriers.forEach(courier => {
        const courierObject = {
            id: courier.ID,
            name: courier.Courier_name,
            amountbefor: courier.Amount_before_VAT,
            eightPercent: (8 / 100) * courier.Amount_before_VAT,
            payment: function () {
                return this.amountbefor - this.eightPercent
            }
        }
        const html = `
            <div class="page">
                <div>${courierObject.id} </div>
                <div> ת.ז</div>
                <div>${courierObject.name} </div>
                <div> שמ ומשפחה</div>
                <div>${courierObject.amountbefor} </div>
                <div> סכום לפני מעם</div>
                <div>${courierObject.eightPercent} </div>
                <div> עמלה 8%</div>
                <div>${courierObject.payment()} </div>
                <div> יתרה לתשלום</div>
            </div>`
        body.insertAdjacentHTML("beforeend", html)
    });
}

calculateCourierAmounts()