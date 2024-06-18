
export const useBuyBoxStore = defineStore('buyBoxStore', () => {

    // states
    const steps = ref([
        {
            id: 1,
            name: "console",
            icon: "console",
            defaultIcon: "console",
            active: false,
            activeColor: 'nn-text-whiteColor',
            activeBgColor: 'nn-bg-xbox',
        },
        {
            id: 2,
            name: "method",
            icon: "method",
            defaultIcon: "method",
            active: false,
            activeColor: 'nn-text-whiteColor',
            activeBgColor: 'nn-bg-purple0',
        },
        {
            id: 3,
            name: "amount",
            icon: "amount",
            defaultIcon: "amount",
            active: false,
            activeColor: 'nn-text-whiteColor',
            activeBgColor: 'nn-bg-orange2',
        },
        {
            id: 4,
            name: "checkout",
            icon: "checkout",
            defaultIcon: "checkout",
            active: false,
            activeColor: 'nn-text-blackColor',
            activeBgColor: 'nn-bg-whiteColor',
        },
        {
            id: 5,
            name: "delivery",
            icon: "delivery",
            defaultIcon: "delivery",
            active: false,
            activeColor: 'nn-text-whiteColor',
            activeBgColor: 'nn-bg-none',
        },
    ]);
    const currentStep = ref({
        id: 1,
        name: 'console'
    });
    const selectedPlatform = ref({});
    const selectedMethod = ref('');
    const coinPackets = ref([]);
    const selectedCoinPacket = ref({});
    const payMethods = ref([]);
    const selectedPayMethod = ref({});
    const orderDetails = ref({});
    const checkoutButtonPrices = ref({});
    const submittedDiscountCode = ref('');

    // actions
    function setCurrentStep(step: object) {
        currentStep.value = step;
        // localStorage.setItem("currentStep", JSON.stringify(currentStep.value));

        steps.value[step.id - 1].icon = steps.value[step.id - 1].defaultIcon;
        // localStorage.setItem("steps", JSON.stringify(steps.value));
    };
    function resetNextSteps(stepInfo: object) {
        if (stepInfo.active) {
            setCurrentStep(stepInfo);
            for (let i = stepInfo.id; i < 5; i++) {
                steps.value[i].active = false;
                steps.value[i].icon = steps.value[i].defaultIcon;
                // localStorage.setItem("steps", JSON.stringify(steps.value));

                // reset stepper content for i+1 step 
                if (i === 3) {
                    // for step 4 (checkout)
                    selectedPayMethod.value = {}
                    // localStorage.setItem('selectedPayMethod', JSON.stringify(selectedPayMethod.value));
                } else if (i === 2) {
                    // for step 3 (amount)
                    selectedCoinPacket.value = {}
                    // localStorage.setItem('selectedCoinPacket', JSON.stringify(selectedCoinPacket.value));
                } else if (i === 1) {
                    // for step 2 (method)
                    selectedMethod.value = '';
                    // localStorage.setItem('selectedMethod', selectedMethod.value);
                }
            }
        }
    };
    function setActiveStep(stepInfo: object) {
        steps.value[stepInfo.index].active = true;
        // localStorage.setItem("steps", JSON.stringify(steps.value));
    };
    function setSelectedPlatform(platform: object) {
        selectedPlatform.value = platform;
        // localStorage.setItem("selectedPlatform", JSON.stringify(selectedPlatform.value));

        steps.value[0].activeBgColor = `nn-bg-${platform.name}`;
        steps.value[0].icon = `console-${platform.name}`;
        // localStorage.setItem("steps", JSON.stringify(steps.value));
        setActiveStep({ index: 0 });
    };
    function setSelectedMethod(method: string) {
        selectedMethod.value = method;
        // localStorage.setItem('selectedMethod', selectedMethod.value);

        steps.value[1].icon = `method-${method}`;
        // localStorage.setItem("steps", JSON.stringify(steps.value));

        setActiveStep({ index: 1 });

    };
    function setCoinPackets(coinPacketsList: Array) {
        coinPackets.value = coinPacketsList;
        // localStorage.setItem('coinPackets', JSON.stringify(coinPackets.value));

        setSelectedCoinPacket(0, coinPacketsList[0]);
    };
    function setSelectedCoinPacket(index: number, coinPacket: object) {
        selectedCoinPacket.value = coinPacket;
        selectedCoinPacket.value.index = index;
        // localStorage.setItem('selectedCoinPacket', JSON.stringify(selectedCoinPacket.value));

        setCheckoutButtonPrices({ 'totalPrice': coinPacket.price, 'finalPrice': coinPacket.price_with_bonus, 'currencySymbol': coinPacket.currency_symbol });
    };
    function setSelectedAmount() {
        steps.value[2].icon = `amount-value`;
        // localStorage.setItem("steps", JSON.stringify(steps.value));

        setActiveStep({ index: 2 });
    };
    function setSelectedPayMethodTab(imageUrl: string) {
        steps.value[3].imgUrl = imageUrl;
        // localStorage.setItem("steps", JSON.stringify(steps.value));

        setActiveStep({ index: 3 });
    };
    function setPayMethods(payMethodsList: Array) {
        payMethods.value = payMethodsList;
        // localStorage.setItem("payMethods", JSON.stringify(payMethods.value));
    };
    function setSelectedPayMethod(payMethod: object) {
        selectedPayMethod.value = payMethod;
        // localStorage.setItem("selectedPayMethod", JSON.stringify(selectedPayMethod.value));

        setSelectedPayMethodTab(payMethod.img_url);
    };
    function setOrderDetails(orderDetail: object) {
        orderDetails.value = orderDetail;
        // localStorage.setItem('orderDetails', JSON.stringify(orderDetails.value));
        
        setCheckoutButtonPrices({ 'totalPrice': orderDetail.convert_standart_price, 'finalPrice': orderDetail.convert_total, 'currencySymbol': orderDetail.symbol });
    };
    function setCheckoutButtonPrices(buttonPrices: object) {
        checkoutButtonPrices.value = buttonPrices;
        // localStorage.setItem('checkoutButtonPrices', JSON.stringify(checkoutButtonPrices.value));
    };
    function setDataFromLocalStorage() {
        // steps.value = JSON.parse(localStorage.getItem('steps')) || steps.value;
        // currentStep.value = JSON.parse(localStorage.getItem('currentStep')) || currentStep.value;
        // selectedPlatform.value = JSON.parse(localStorage.getItem('selectedPlatform')) || selectedPlatform.value;
        // selectedMethod.value = localStorage.getItem('selectedMethod') || selectedMethod.value;
        // coinPackets.value = JSON.parse(localStorage.getItem('coinPackets')) || coinPackets.value;
        // selectedCoinPacket.value = JSON.parse(localStorage.getItem('selectedCoinPacket')) || selectedCoinPacket.value;
        // payMethods.value = JSON.parse(localStorage.getItem('payMethods')) || payMethods.value;
        // selectedPayMethod.value = JSON.parse(localStorage.getItem('selectedPayMethod')) || selectedPayMethod.value;
        // orderDetails.value = JSON.parse(localStorage.getItem('orderDetails')) || orderDetails.value;
        // checkoutButtonPrices.value = JSON.parse(localStorage.getItem('checkoutButtonPrices')) || checkoutButtonPrices.value;
    };
    function setSubmittedDiscountCode(discountCode:string) {
        submittedDiscountCode.value = discountCode;
    };

    return {
        steps, currentStep, selectedPlatform, selectedMethod, coinPackets, selectedCoinPacket,
        payMethods, selectedPayMethod, orderDetails, checkoutButtonPrices, submittedDiscountCode,
        resetNextSteps, setCurrentStep, setSelectedPlatform, setSelectedMethod, setCoinPackets, setSelectedCoinPacket,
        setSelectedAmount, setSelectedPayMethodTab, setPayMethods, setSelectedPayMethod, setOrderDetails, setCheckoutButtonPrices,
        setDataFromLocalStorage,setActiveStep, setSubmittedDiscountCode
    }
},
    // in persist mood there was some bug for saving state for buyBox 
    //  { persist: true }
);
