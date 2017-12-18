/** Saving urlRegex on a variable */

var urlRegex = "@(https?|ftp)://(-.)?([^s/?.#-]+.?)+(/[^s]*)?$@iS";

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(
  (function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
      it("has a URL", function() {
        allFeeds.forEach(function(feed) {
          expect(feed.url).toBeDefined();
          expect(feed.url).not.toBe("");
          expect(feed.url).not.toBeNull();
          expect(feed.url).not.toMatch(urlRegex);
        });
      });

      /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
      it("has a Name", function() {
        allFeeds.forEach(function(feed) {
          expect(feed.name).toBeDefined();
          expect(feed.name).not.toBe("");
          expect(feed.name).not.toBeNull();
        });
      });
    });

    /* TODO: Write a new test suite named "The menu" */

    describe("The menu", function() {
      /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
      it("start as hidden", function() {
        expect($("body").hasClass("menu-hidden")).toBe(true);
      });

      /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
      it("show and hide menu on click", function() {
        menuIcon = $(".menu-icon-link");
        menuIcon.click();
        expect($("body").hasClass("menu-hidden")).toBe(false);
        menuIcon.trigger("click");
        expect($("body").hasClass("menu-hidden")).toBe(true);
      });
    });
    /* TODO: Write a new test suite named "Initial Entries" */

    describe("Initial Entries", function() {
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

      it("is loaded", function(done) {
        expect($(".feed .entry").length).toBeGreaterThan(0);
        done();
      });
      /* TODO: Write a new test suite named "New Feed Selection" */
      describe("New Feed Selection", function() {
        var beforeFeedContent;
        beforeEach(function(done) {
          beforeFeedContent = $(".feed").html();
          loadFeed(1, done);
        });

        /* TODO: Write a test that ensures when a new feed is loaded
             * by the loadFeed function that the content actually changes.
             * Remember, loadFeed() is asynchronous.
             */
        it("content changed", function(done) {
          var afterFeedContent = $(".feed").html();
          expect(afterFeedContent).not.toBe(beforeFeedContent);
          done();
        });

        afterEach(function(done) {
          loadFeed(0, done);
        });
      });
    });

    describe("Error Handlers", function() {
      afterEach(function() {
        allFeeds.splice(4, 1);
      });

      it("return error to out of bound array", function() {
        var outOfBounds = function() {
          loadFeed(12);
        };
        expect(outOfBounds).toThrowError("Array out of bounds");
      });

      it("return error to undefined feedUrl", function() {
        allFeeds.push({ name: "fake Feed" });
        var noFeedUrl = function() {
          loadFeed(4);
        };
        expect(noFeedUrl).toThrowError("feedUrl is undefined");
      });

      it("return error to undefined feedName", function() {
        allFeeds.push({ url: "http://fake.com" });
        var noFeedName = function() {
          loadFeed(4);
        };
        expect(noFeedName).toThrowError("feedName is undefined");
      });
    });
  })()
);
