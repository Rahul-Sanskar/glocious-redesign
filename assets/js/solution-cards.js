(function () {
    var sections = document.querySelectorAll(".dwp-solution-list");
    if (!sections.length) return;

    sections.forEach(function (section) {
        var list = section.querySelector("ul");
        if (!list) return;

        var timer = null;
        var wasDesktop = window.innerWidth > 1024;
        var items = Array.prototype.slice.call(list.children).filter(function (item) {
            return item.matches("li");
        });

        function visibleItems() {
            return items.filter(function (item) {
                return window.getComputedStyle(item).display !== "none";
            });
        }

        function activate(item) {
            items.forEach(function (card) {
                card.classList.toggle("active", card === item);
            });
        }

        function stopRotation() {
            if (timer) {
                window.clearInterval(timer);
                timer = null;
            }
        }

        function rotateLeft() {
            var shown = visibleItems();
            if (shown.length < 2) return;

            var current = shown.findIndex(function (item) {
                return item.classList.contains("active");
            });
            if (current < 0) current = 0;
            activate(shown[(current - 1 + shown.length) % shown.length]);
        }

        function startRotation() {
            if (window.innerWidth <= 1024 ||
                window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
                timer ||
                section.matches(":hover, :focus-within")) return;

            timer = window.setInterval(rotateLeft, 1000);
        }

        items.forEach(function (item) {
            item.addEventListener("mouseenter", function () {
                stopRotation();
                activate(item);
            });
        });

        section.addEventListener("mouseleave", startRotation);
        section.addEventListener("focusin", function (event) {
            var card = event.target.closest("li");
            if (!card || !section.contains(card)) return;
            stopRotation();
            activate(card);
        });
        section.addEventListener("focusout", function (event) {
            if (!section.contains(event.relatedTarget)) {
                window.setTimeout(startRotation, 0);
            }
        });

        window.addEventListener("resize", function () {
            var isDesktop = window.innerWidth > 1024;
            if (!isDesktop) {
                stopRotation();
            } else if (!wasDesktop) {
                var shown = visibleItems();
                if (shown.length) activate(shown[shown.length - 1]);
                startRotation();
            }
            wasDesktop = isDesktop;
        });

        var shown = visibleItems();
        if (window.innerWidth > 1024 && shown.length) {
            activate(shown[shown.length - 1]);
            startRotation();
        }
    });
})();
