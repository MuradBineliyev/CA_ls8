    function createTable(data) {

        document.querySelector('tbody').innerHTML = "";
        let No = 1;
        data.forEach(element => {

            let trElement = document.createElement('tr');

            let noTd = document.createElement('td');
            noTd.innerHTML = No++;

            let idTd = document.createElement('td');
            idTd.innerHTML = element.id;

            let customerIdTd = document.createElement('td');
            customerIdTd.innerHTML = element.customerId;

            let employeeIdTd = document.createElement('td');
            employeeIdTd.innerHTML = element.employeeId;

            let orderDateTd = document.createElement('td');
            orderDateTd.innerHTML = element.orderDate;

            let shipCityTd = document.createElement('td');
            shipCityTd.innerHTML = element.shipAddress?.city;

            let shipCountryTd = document.createElement('td');
            shipCountryTd.innerHTML = element.shipAddress?.country;

            let cartLengthTd = document.createElement('td');
            cartLengthTd.innerHTML = element.details.length;



            let totalCart = orderPrice(element.details);
            let totalQuantity = element.details.map(x => x.quantity).reduce((a,b)=>a+b);
            

            let cartTotalTd = document.createElement('td');
            cartTotalTd.innerHTML = totalCart.toFixed(2);

            element.cartLength = element.details.length;
            element.totalCart = totalCart;
            element.totalQuantity = totalQuantity;

            trElement.appendChild(noTd);
            trElement.appendChild(idTd);
            trElement.appendChild(customerIdTd);
            trElement.appendChild(employeeIdTd);
            trElement.appendChild(orderDateTd);
            trElement.appendChild(shipCityTd);
            trElement.appendChild(shipCountryTd);
            trElement.appendChild(cartLengthTd);
            trElement.appendChild(cartTotalTd);

            document.querySelector('tbody').appendChild(trElement);
        });
    }

    function getFreightSmallOne(data){
        return data.filter(x=>x.freight < 1);
    }

    // 2) customerID WARTH olan neçə ədəd sifariş var?

    function getCountCustomerId(data, key){
        let items = data.filter(x=>x.customerId == key);
        createTable(items)
        let totalcount = items.map((x)=>{
            return x.details.length ;
        }).reduce((a,b)=>a+b);

        let trTotal = document.createElement("tr");
        trTotal.style.background = "yellow";
        let tdTotal = document.createElement("td");
        tdTotal.innerText = key + " total order";
        tdTotal.colSpan = "7";

        let tdTotalCount = document.createElement("td");
        tdTotalCount.innerText = totalcount;

        let tdEmpty = document.createElement("td");

        trTotal.appendChild(tdTotal);
        trTotal.appendChild(tdTotalCount);
        trTotal.appendChild(tdEmpty);

        document.querySelector('tbody').appendChild(trTotal);
        document.getElementsByTagName("h1")[0].innerText = "2) customerID WARTH olan neçə ədəd sifariş var?";

        return totalcount;
    }

    // 3) Ən dəyərli müştəri

    function dearCustomer(data){
        let getCustomers = data.map(x=>x.customerId);
        let customerUnique = [... new Set(getCustomers)];
        let customerItems = [];
        let customerTotalPay = 0;
        customerUnique.forEach(element => {
            let items = data.filter(x => x.customerId == element);
            var totalPay = items.map((x)=>{
                return x.totalCart ;
            }).reduce((a,b)=>a+b);

            if(customerTotalPay < totalPay){
                customerTotalPay = totalPay;
                customerItems = items;
            }
        });

        createTable(customerItems)

        let trTotal = document.createElement("tr");
        trTotal.style.background = "yellow";
        let tdTotal = document.createElement("td");
        tdTotal.innerText = "Total pay";
        tdTotal.colSpan = "8";

        let tdTotalPay = document.createElement("td");
        tdTotalPay.innerText = customerTotalPay.toFixed(2);

        trTotal.appendChild(tdTotal);
        trTotal.appendChild(tdTotalPay);

        document.querySelector('tbody').appendChild(trTotal);
        document.getElementsByTagName("h1")[0].innerText = "3) Ən dəyərli müştəri";


        return customerItems;
    }

    // 4) Ən dəyərli işçi
    function dearEmployee(data){
        let getEmpls = data.map(x=>x.employeeId);
        let employeeUnique = [... new Set(getEmpls)];
        let employeeItems = [];
        let employeeTotalSell = 0;
        
        employeeUnique.forEach(element => {
            let items = data.filter(x => x.employeeId == element);
            var totalSell = items.map((x)=>{
                return x.totalCart ;
            }).reduce((a,b)=>a+b);

            if(employeeTotalSell < totalSell){
                employeeTotalSell = totalSell;
                employeeItems = items;
            }
        });

        createTable(employeeItems)

        let trTotal = document.createElement("tr");
        trTotal.style.background = "yellow";
        let tdTotal = document.createElement("td");
        tdTotal.innerText = "Total sell";
        tdTotal.colSpan = "8";

        let tdTotalPay = document.createElement("td");
        tdTotalPay.innerText = employeeTotalSell.toFixed(2);

        trTotal.appendChild(tdTotal);
        trTotal.appendChild(tdTotalPay);

        document.querySelector('tbody').appendChild(trTotal);
        document.getElementsByTagName("h1")[0].innerText = "4) Ən dəyərli işçi";

        return employeeTotalSell;
    }


    // 5) Hər sifarişin ümumi qiymətini tapan bir function yazılmalıdır.
    function orderPrice(carts){
        let totalCart = 0;

        carts.forEach(item => {
            totalCart += ((item.unitPrice * item.quantity) * (1 - item.discount))
        })
        return totalCart;
    }

    // 6) Ən yüksək endirim hansı sifarişdə olub onu hesablayan function.
    function maxDiscount(data){
        let maxDiscount = 0;
        let maxDiscountOrder = [];
        data.forEach(element => {
            let getMaxDiscountByDete = element.details.sort((a,b)=>b.discount - a.discount)[0].discount;
            if(getMaxDiscountByDete > maxDiscount){
                maxDiscount = getMaxDiscountByDete;
                maxDiscountOrder = element;
            } 
        });

        createTable([maxDiscountOrder])

        let trTotal = document.createElement("tr");
        trTotal.style.background = "yellow";

        let tdTotal = document.createElement("td");
        tdTotal.innerText = "Max discount: ";

        tdTotal.colSpan = "8";

        let tdTotalPay = document.createElement("td");
        tdTotalPay.innerText = maxDiscount.toFixed(2);

        trTotal.appendChild(tdTotal);
        trTotal.appendChild(tdTotalPay);

        document.querySelector('tbody').appendChild(trTotal);
        document.getElementsByTagName("h1")[0].innerText = "6) Ən yüksək endirim hansı sifarişdə olub onu hesablayan function.";
        return maxDiscount;
    }

    // 7) Ən çox satılan məhsulun id-ni tapan bir function. 
    function getIdByMaxQuantity(data){
        let orderDetails = [];
        data.forEach(e => {
            orderDetails.push(...e.details);
        })
        orderDetails = orderDetails
        let uniqProductId = [... new Set(orderDetails.map(x => x.productId))]
        let sumQuantity = [];
        let maxSellId = 0
        uniqProductId.forEach(e => {
            let o = orderDetails.filter(x => x.productId == e).map(x => x.quantity).reduce((a,b) => a+b)
            sumQuantity[e] = o;
            sumQuantity = sumQuantity.filter(x => x>0)
            maxSellId = Math.max(...sumQuantity);
        })

        let trTotal = document.createElement("tr");
        trTotal.style.background = "yellow";

        let tdTotal = document.createElement("td");
        tdTotal.innerText = "Max Sell id: ";

        tdTotal.colSpan = "8";

        let tdTotalPay = document.createElement("td");
        tdTotalPay.innerText = maxSellId;
        
        document.querySelector('tbody').innerHTML = "";
        trTotal.appendChild(tdTotal);
        trTotal.appendChild(tdTotalPay);

        document.querySelector('tbody').appendChild(trTotal);
        document.getElementsByTagName("h1")[0].innerText = "7) Ən çox satılan məhsulun id-ni tapan bir function. ";
      


    }

    // 8) Hər ölkədə (shipCountry) nə qədər satış olduğunu, nə qədər qazanc gətirdiyi barədə yeni bir array yaradılmalıdır. Arrayin itemları bu şəkildə olacaq. ( { shipCountry: "USA", totapPrice: 1245, quantity: 123} )
    function countyActivite(data){
        let uniqCountry = [... new Set(data.map(x => x.shipAddress.country))]
        let respons = [];
        uniqCountry.forEach(element => {
            let countyOrder = data.filter(x => x.shipAddress.country == element);
            
            let obj = {
                shipCountry: element,
                totapPrice: countyOrder.map(x => x.totalCart).reduce((a,b) => a+b),
                quantity: countyOrder.map(x => x.totalQuantity).reduce((a,b) => a+b)
            }

            respons.push(obj);
        });
        console.log(respons);

    }