$(document).ready(function () {
    var isMobile = Boolean(kendo.support.mobileOS);

    $("#menu").kendoMenu();

    $("#grid").kendoGrid({
        dataSource: {
            data: products,
            schema: {
                model: {
                    fields: {
                        ProductName: { type: "string" },
                        UnitPrice: { type: "number" },
                        UnitsInStock: { type: "number" },
                        Discontinued: { type: "boolean" }
                    }
                }
            },
            pageSize: 20
        },
        scrollable: true,
        sortable: true,
        filterable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            "ProductName",
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
            { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
            { field: "Discontinued", width: "130px" }
        ]
    });

    $("#drawer").kendoDrawer({
        template: "<ul> \
                    <li data-role='drawer-item' class='k-state-selected'><span class='k-icon k-i-inbox'></span><span class='k-item-text'>Inbox</span></li> \
                    <li data-role='drawer-separator'></li> \
                    <li data-role='drawer-item'><span class='k-icon k-i-notification k-i-bell'></span><span class='k-item-text'>Notifications</span></li> \
                    <li data-role='drawer-item'><span class='k-icon k-i-calendar'></span><span class='k-item-text'>Calendar</span></li> \
                    <li data-role='drawer-separator'></li> \
                    <li data-role='drawer-item'><span class='k-icon k-i-hyperlink-email'></span><span class='k-item-text'>Attachments</span></li> \
                    <li data-role='drawer-item'><span class='k-icon k-i-star-outline k-i-bookmark-outline'></span><span class='k-item-text'>Favourites</span></li> \
                  </ul>",
        mode: "push",
        itemClick: function (e) {
            if (!e.item.hasClass("k-drawer-separator")) {
                e.sender.drawerContainer.find("#drawer-content > div").addClass("hidden");
                e.sender.drawerContainer.find("#drawer-content").find("#" + e.item.find(".k-item-text").text()).removeClass("hidden");
            }
        },
        position: 'right',
        minHeight: 500,
        swipeToOpen: true
    });

    if (isMobile) {
        $("#menu").hide();
        $(".footer").hide();
        $(".drawer-container").hide();
    }
});

function toggleDrawer() {
    var drawerInstance = $("#drawer").data().kendoDrawer;
    var drawerContainer = drawerInstance.drawerContainer;

    if (drawerContainer.hasClass("k-drawer-expanded")) {
        drawerInstance.hide();
    } else {
        drawerInstance.show();
    }
}

$("#toolbar").kendoToolBar({
    items: [
        { type: "button", icon: "menu", attributes: { "class": "k-flat" }, click: toggleDrawer },
        { template: "<h4 style='margin-left: 20px;'>Drawer</h4>" }
    ]
});