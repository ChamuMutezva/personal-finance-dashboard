const users = [
    {
        id: "410544b2-4001-4271-9855-fec4b6a6442a",
        name: "User",
        email: "user@nextmail.com",
        password: "123456",
    },
];

const balances = [
    {
        current: 4836.0,
        income: 3814.25,
        expenses: 1700.5,
    },
];

const transactions = [
    {
        id: "2b8db5a7-3d7c-4517-a94c-d9a1c2b6962f",
        avatar: "/assets/images/avatars/emma-richardson.jpg",
        name: "Emma Richardson",
        category: "General",
        date: "2024-12-19T14:23:11Z",
        amount: 75.5,
        recurring: false,
    },
    {
        id: "24dcbc49-8a49-4057-a472-d178fda7254f",
        avatar: "/assets/images/avatars/savory-bites-bistro.jpg",
        name: "Savory Bites Bistro",
        category: "Dining Out",
        date: "2024-12-19T20:23:11Z",
        amount: -55.5,
        recurring: false,
    },
    {
        id: "5d45e1dd-9a31-4151-8527-36d05ab4ec7b",
        avatar: "/assets/images/avatars/daniel-carter.jpg",
        name: "Daniel Carter",
        category: "General",
        date: "2024-12-18T09:45:32Z",
        amount: -42.3,
        recurring: false,
    },
    {
        id: "21548312-e2be-43e1-99b5-9e22a5abfc94",
        avatar: "/assets/images/avatars/sun-park.jpg",
        name: "Sun Park",
        category: "General",
        date: "2024-12-17T16:12:05Z",
        amount: 120.0,
        recurring: false,
    },
    {
        id: "dae7bd0b-6c34-4a5d-997f-8be8b46027df",
        avatar: "/assets/images/avatars/urban-services-hub.jpg",
        name: "Urban Services Hub",
        category: "General",
        date: "2024-12-17T21:08:09Z",
        amount: -65.0,
        recurring: false,
    },
    {
        id: "5886b61e-c670-44bd-a502-c9d6eccbe4dc",
        avatar: "/assets/images/avatars/liam-hughes.jpg",
        name: "Liam Hughes",
        category: "Groceries",
        date: "2024-12-15T18:20:33Z",
        amount: 65.75,
        recurring: false,
    },
    {
        id: "ce097ee0-fb30-4352-bf0b-0d418b15c101",
        avatar: "/assets/images/avatars/lily-ramirez.jpg",
        name: "Lily Ramirez",
        category: "General",
        date: "2024-12-14T13:05:27Z",
        amount: 50.0,
        recurring: false,
    },
    {
        id: "2739f19d-e5da-4723-a990-f1fe5934f0ed",
        avatar: "/assets/images/avatars/ethan-clark.jpg",
        name: "Ethan Clark",
        category: "Dining Out",
        date: "2024-12-13T20:15:59Z",
        amount: -32.5,
        recurring: false,
    },
    {
        id: "1353616f-bcfa-4763-973d-2963ac37422b",
        avatar: "/assets/images/avatars/james-thompson.jpg",
        name: "James Thompson",
        category: "Entertainment",
        date: "2024-12-11T15:45:38Z",
        amount: -5.0,
        recurring: false,
    },
    {
        id: "c4eac299-1941-4c9a-bc96-9f3fce596f9c",
        avatar: "/assets/images/avatars/pixel-playground.jpg",
        name: "Pixel Playground",
        category: "Entertainment",
        date: "2024-12-11T18:45:38Z",
        amount: -10.0,
        recurring: true,
    },
    {
        id: "f966401a-9ccb-4587-a1bd-fe2ddbb1fed4",
        avatar: "/assets/images/avatars/ella-phillips.jpg",
        name: "Ella Phillips",
        category: "Dining Out",
        date: "2024-12-10T19:22:51Z",
        amount: -45.0,
        recurring: false,
    },
    {
        id: "5e9123e8-e2f7-492e-b79f-23a6fd1858da",
        avatar: "/assets/images/avatars/sofia-peterson.jpg",
        name: "Sofia Peterson",
        category: "Transportation",
        date: "2024-12-08T08:55:17Z",
        amount: -15.0,
        recurring: false,
    },
    {
        id: "77240789-b8ad-43de-a384-47355e51a0e3",
        avatar: "/assets/images/avatars/mason-martinez.jpg",
        name: "Mason Martinez",
        category: "Lifestyle",
        date: "2024-12-07T17:40:29Z",
        amount: -35.25,
        recurring: false,
    },
    {
        id: "dc202422-dc09-417a-8a58-3f13165a0ce6",
        avatar: "/assets/images/avatars/green-plate-eatery.jpg",
        name: "Green Plate Eatery",
        category: "Groceries",
        date: "2024-12-06T08:25:44Z",
        amount: -78.5,
        recurring: false,
    },
    {
        id: "5baf8e03-3312-47af-8d0b-eb57c34dd235",
        avatar: "/assets/images/avatars/sebastian-cook.jpg",
        name: "Sebastian Cook",
        category: "Transportation",
        date: "2024-12-06T10:05:44Z",
        amount: -22.5,
        recurring: false,
    },
    {
        id: "374b95d5-f72e-42b7-948a-b5ce50e67b64",
        avatar: "/assets/images/avatars/william-harris.jpg",
        name: "William Harris",
        category: "Personal Care",
        date: "2024-12-05T14:30:56Z",
        amount: -10.0,
        recurring: false,
    },
    {
        id: "8a939106-1458-4776-9153-7034b15a86c0",
        avatar: "/assets/images/avatars/elevate-education.jpg",
        name: "Elevate Education",
        category: "Education",
        date: "2024-12-04T11:15:22Z",
        amount: -50.0,
        recurring: true,
    },
    {
        id: "b44ded83-75a1-4b34-a110-a7f9f1df0748",
        avatar: "/assets/images/avatars/serenity-spa-and-wellness.jpg",
        name: "Serenity Spa & Wellness",
        category: "Personal Care",
        date: "2024-12-03T14:00:37Z",
        amount: -30.0,
        recurring: true,
    },
    {
        id: "7ec0a3eb-340c-4d6c-98ff-5d3a021d4425",
        avatar: "/assets/images/avatars/spark-electric-solutions.jpg",
        name: "Spark Electric Solutions",
        category: "Bills",
        date: "2024-12-02T09:25:11Z",
        amount: -100.0,
        recurring: true,
    },
    {
        id: "7d0131df-e36d-4ac7-81ce-fe360863dd55",
        avatar: "/assets/images/avatars/rina-sato.jpg",
        name: "Rina Sato",
        category: "Bills",
        date: "2024-12-02T13:31:11Z",
        amount: -50.0,
        recurring: false,
    },
    {
        id: "03562b0b-6405-4772-b7fb-a7cf73aab912",
        avatar: "/assets/images/avatars/swift-ride-share.jpg",
        name: "Swift Ride Share",
        category: "Transportation",
        date: "2024-12-01T18:40:33Z",
        amount: -18.75,
        recurring: false,
    },
    {
        id: "057245ba-3060-4ec7-8f92-527878d1f7c1",
        avatar: "/assets/images/avatars/aqua-flow-utilities.jpg",
        name: "Aqua Flow Utilities",
        category: "Bills",
        date: "2024-12-30T13:20:14Z",
        amount: -100.0,
        recurring: true,
    },
    {
        id: "b167261b-38d2-435e-b879-80ee7e080c97",
        avatar: "/assets/images/avatars/ecofuel-energy.jpg",
        name: "EcoFuel Energy",
        category: "Bills",
        date: "2024-12-29T11:55:29Z",
        amount: -35.0,
        recurring: true,
    },
    {
        id: "e611e75e-364e-4712-9a86-f1e783a63774",
        avatar: "/assets/images/avatars/yuna-kim.jpg",
        name: "Yuna Kim",
        category: "Dining Out",
        date: "2024-12-29T13:51:29Z",
        amount: -28.5,
        recurring: false,
    },
    {
        id: "17fac012-7b46-4c19-ba52-d51781b780a1",
        avatar: "/assets/images/avatars/flavor-fiesta.jpg",
        name: "Flavor Fiesta",
        category: "Dining Out",
        date: "2024-12-27T20:15:06Z",
        amount: -42.75,
        recurring: false,
    },
    {
        id: "f8c8da68-a88f-4d39-bcbf-cb57a1b63368",
        avatar: "/assets/images/avatars/harper-edwards.jpg",
        name: "Harper Edwards",
        category: "Shopping",
        date: "2024-12-26T09:43:23Z",
        amount: -89.99,
        recurring: false,
    },
    {
        id: "65a299b8-b88c-4dad-b363-261c07c0f5ad",
        avatar: "/assets/images/avatars/buzz-marketing-group.jpg",
        name: "Buzz Marketing Group",
        category: "General",
        date: "2024-12-26T14:40:23Z",
        amount: 3358.0,
        recurring: false,
    },
    {
        id: "17c7da07-c57f-4b63-a3a9-012921cc10cc",
        avatar: "/assets/images/avatars/technova-innovations.jpg",
        name: "TechNova Innovations",
        category: "Shopping",
        date: "2024-12-25T16:25:37Z",
        amount: -29.99,
        recurring: false,
    },
    {
        id: "fca43e9f-936a-4cf4-8833-92bf9ad9c82f",
        avatar: "/assets/images/avatars/bytewise.jpg",
        name: "ByteWise",
        category: "Lifestyle",
        date: "2024-12-23T09:35:14Z",
        amount: -49.99,
        recurring: true,
    },
    {
        id: "2e0582d1-4091-4494-a6c2-93fd93531174",
        avatar: "/assets/images/avatars/nimbus-data-storage.jpg",
        name: "Nimbus Data Storage",
        category: "Bills",
        date: "2024-12-21T10:05:42Z",
        amount: -9.99,
        recurring: true,
    },
    {
        id: "07587484-c8c6-4d3c-91ec-7aa032f30541",
        avatar: "/assets/images/avatars/emma-richardson.jpg",
        name: "Emma Richardson",
        category: "General",
        date: "2024-12-20T17:30:55Z",
        amount: -25.0,
        recurring: false,
    },
    {
        id: "41c3b6a9-fee3-438d-86bc-25bf7c2d8224",
        avatar: "/assets/images/avatars/daniel-carter.jpg",
        name: "Daniel Carter",
        category: "General",
        date: "2024-12-19T12:45:09Z",
        amount: 50.0,
        recurring: false,
    },
    {
        id: "004d61a9-030e-44e3-ac55-864b37845353",
        avatar: "/assets/images/avatars/sun-park.jpg",
        name: "Sun Park",
        category: "General",
        date: "2024-12-18T19:20:23Z",
        amount: -38.5,
        recurring: false,
    },
    {
        id: "7ac71bb9-c6ed-4ca5-8b64-b42360b9efc7",
        avatar: "/assets/images/avatars/harper-edwards.jpg",
        name: "Harper Edwards",
        category: "Shopping",
        date: "2024-12-17T14:55:37Z",
        amount: -29.99,
        recurring: false,
    },
    {
        id: "5fc88660-64c1-4e66-b263-4c0e0f6612f9",
        avatar: "/assets/images/avatars/liam-hughes.jpg",
        name: "Liam Hughes",
        category: "Groceries",
        date: "2024-12-16T10:10:51Z",
        amount: -52.75,
        recurring: false,
    },
    {
        id: "86e6ef9b-a654-431d-a0e0-cb234a933b4d",
        avatar: "/assets/images/avatars/lily-ramirez.jpg",
        name: "Lily Ramirez",
        category: "General",
        date: "2024-12-15T16:35:04Z",
        amount: 75.0,
        recurring: false,
    },
    {
        id: "59dec6fe-57b2-42bb-af26-c4e52f6a0e52",
        avatar: "/assets/images/avatars/ethan-clark.jpg",
        name: "Ethan Clark",
        category: "Dining Out",
        date: "2024-12-14T20:50:18Z",
        amount: -41.25,
        recurring: false,
    },
    {
        id: "8623c0a3-8565-4529-aa23-25de001d8c2b",
        avatar: "/assets/images/avatars/rina-sato.jpg",
        name: "Rina Sato",
        category: "Entertainment",
        date: "2024-12-13T09:15:32Z",
        amount: -10.0,
        recurring: false,
    },
    {
        id: "516350f1-3385-4a82-b3c8-ee097a9dbe33",
        avatar: "/assets/images/avatars/james-thompson.jpg",
        name: "James Thompson",
        category: "Bills",
        date: "2024-12-12T13:40:46Z",
        amount: -95.5,
        recurring: false,
    },
    {
        id: "13b7695b-188d-4801-9add-e23c17a2386b",
        avatar: "/assets/images/avatars/ella-phillips.jpg",
        name: "Ella Phillips",
        category: "Dining Out",
        date: "2024-12-11T18:05:59Z",
        amount: -33.75,
        recurring: false,
    },
    {
        id: "7ea56cef-ddbc-4417-84fe-8268e667ec03",
        avatar: "/assets/images/avatars/yuna-kim.jpg",
        name: "Yuna Kim",
        category: "Dining Out",
        date: "2024-12-10T12:30:13Z",
        amount: -27.5,
        recurring: false,
    },
    {
        id: "52f38018-97d5-41fc-ad91-0ceed73fba0a",
        avatar: "/assets/images/avatars/sofia-peterson.jpg",
        name: "Sofia Peterson",
        category: "Transportation",
        date: "2024-12-09T08:55:27Z",
        amount: -12.5,
        recurring: false,
    },
    {
        id: "e44959af-de8f-4aff-afca-84a5b9502aa0",
        avatar: "/assets/images/avatars/mason-martinez.jpg",
        name: "Mason Martinez",
        category: "Lifestyle",
        date: "2024-12-08T15:20:41Z",
        amount: -65.0,
        recurring: false,
    },
    {
        id: "3db82d92-67b9-411e-91a5-2c6b1341327c",
        avatar: "/assets/images/avatars/sebastian-cook.jpg",
        name: "Sebastian Cook",
        category: "Transportation",
        date: "2024-12-07T11:45:55Z",
        amount: -20.0,
        recurring: false,
    },
    {
        id: "ae567174-9f1d-457c-a8b2-63aed5653607",
        avatar: "/assets/images/avatars/william-harris.jpg",
        name: "William Harris",
        category: "General",
        date: "2024-12-06T17:10:09Z",
        amount: 20.0,
        recurring: false,
    },
    {
        id: "5600f707-ff5e-4efc-8f62-afde796f783b",
        avatar: "/assets/images/avatars/elevate-education.jpg",
        name: "Elevate Education",
        category: "Education",
        date: "2024-12-05T11:15:22Z",
        amount: -50.0,
        recurring: true,
    },
    {
        id: "2717ad55-b13e-422b-9a9c-fb299394f609",
        avatar: "/assets/images/avatars/serenity-spa-and-wellness.jpg",
        name: "Serenity Spa & Wellness",
        category: "Personal Care",
        date: "2024-12-03T14:00:37Z",
        amount: -30.0,
        recurring: true,
    },
    {
        id: "3aa42401-8e7d-4d53-9d3c-72b0e1380176",
        avatar: "/assets/images/avatars/spark-electric-solutions.jpg",
        name: "Spark Electric Solutions",
        category: "Bills",
        date: "2024-12-02T09:25:51Z",
        amount: -100.0,
        recurring: true,
    },
    {
        id: "a8d5286f-4162-4677-86e4-56ce44a2782f",
        avatar: "/assets/images/avatars/swift-ride-share.jpg",
        name: "Swift Ride Share",
        category: "Transportation",
        date: "2024-12-02T19:50:05Z",
        amount: -16.5,
        recurring: false,
    },
];

const budgets = [
    {
        id: "2b1fee0e-7c1a-487f-ad06-c14f37468fa9",
        category: "Entertainment",
        maximum: 50.0,
        theme: "#277C78",
    },
    {
        id: "a74d4bcd-ace4-4d23-9614-ab4884816a6f",
        category: "Bills",
        maximum: 750.0,
        theme: "#82C9D7",
    },
    {
        id: "e13f4bee-f98b-4b2d-812c-e749837823a3",
        category: "Dining Out",
        maximum: 75.0,
        theme: "#F2CDAC",
    },
    {
        id: "74b21896-f0cc-4547-88cb-01da1328fbaf",
        category: "Personal Care",
        maximum: 100.0,
        theme: "#626070",
    },
];

const pots = [
    {
        id: "57595f3b-8118-4846-8880-e67e5171e34d",
        name: "Savings",
        target: 2000.0,
        total: 159.0,
        theme: "#277C78",
    },
    {
        id: "528a67c6-2528-497b-b6a4-5fa279b547b2",
        name: "Concert Ticket",
        target: 150.0,
        total: 110.0,
        theme: "#626070",
    },
    {
        id: "979dfac7-b5e2-4eef-b3aa-a5f650fbd0b1",
        name: "Gift",
        target: 150.0,
        total: 110.0,
        theme: "#82C9D7",
    },
    {
        id: "d0170cdb-704a-4bfe-9942-fe3ab739889f",
        name: "New Laptop",
        target: 1000.0,
        total: 10.0,
        theme: "#F2CDAC",
    },
    {
        id: "7bfd2ead-a325-452f-b2f8-e49707015178",
        name: "Holiday",
        target: 1440.0,
        total: 531.0,
        theme: "#826CB0",
    },
];

export { balances, transactions, budgets, pots, users };
