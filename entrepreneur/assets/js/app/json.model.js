var getModel = (function(){

	var year = (new Date()).getFullYear();

	var model = {
					name: "Richard L. Garcia",
					tagline: "Dude, Data, Developer",
					avatar: "/img/rich.beanie.copy.jpg",
					email: "rchgrca@gmail.com",
					phone: "510.918.3102",
					project:[
						{
							"name":"top",
							"class":"one dark cover",
							"font-awesome":"fa-user",
							"display":"About",
							"content":'<p>I am a seasoned frontend developer who has created applications for the world&rsquo;s most trafficked sites: Yahoo!, AOL, Intuit, and eBay. I also co-founded startup <a href="http://blyve.com" 		target="_blank">Blyve.com</a>.</p><p class="resume"><a href="resume" target="_blank" class="button scrolly">Resume</a></p>'
						},
						{
							"name":"euclid",
							"class":"two",
							"font-awesome":"fa-building",
							"display":"Euclid",
							"content":'<p classs="task"><span>TASK</span><span>Data Visualization</span></p><p class="tech"><span>TECHNOLOGY</span><span>Euclid provides customer location data analytics for brick and mortar businesses. I am currently responsible for creating the frontend application that visualizes enormous datasets provided by the largest sensor network in the world. The stack is compromised of BackboneJS, MarionetteJS, Ruby On Rails, and MySQL. Test driven development with JasmineJS is used in lieu of QA team.</span></p>'
						},
						{
							"name":"intuit",
							"class":"three",
							"font-awesome":"fa-usd",
							"display":"Intuit",
							"content":'<p classs="task"><span>TASK</span><span>Creation of Adobe CQ5 Web Components</span></p><p class="tech"><span>TECHNOLOGY</span><span>One CQ5 server provides "authoring" capabilities for the marketing team. This allows them to create create and update web and mobile pages very quickly. The output of CQ5 was a JSON structure fed to "Showroom", a farm of significantly less expensive servers running Ruby on Rails. jRuby technology merged the CQ5 JSP environment and Ruby on Rails environment of Showroom. Mustache templates allowed for the creation of separate, distinct "views."</span></p><p class="prob"><span>PROBLEM</span><span>Uncommon Design Patterns: CQ5 does a great job allowing non-developers the ability to create web and mobile pages quickly and easily. For developers, each day is tasked with having to code around the limitations of CQ5. As one is bound by using proprietary form "widgets" for user input, there is often a gap between what the developer requires for form input vs. what CQ5 provides. The solution usually creates a "snowball" effect where the developer creates code around this limitation only to find that more code is required to complete the solution in the end.<br/><br/>I was tasked to create a "bar graph" web component. The final result is on the <a href="http://quickbooks.intuit.com.au" target="_blank">Quickbooks Australia</a> landing page (search: "Favorite features voted by others"). I needed to create a bar graph with one to multiple rows, each requiring two distinct elements: an integeter representing the percentage and a string representing the bar description. The percentage would also be used to calculate the width of the bar that is shaded.<br/><br/>Conventional HTML forms cannot be used. The only form I have available for multiple data user input is the <a href="/code/intuit/cq5.edit.bargraph.jpg" target="_blank" >CQ5 multifield widget</a>. The solution was to format the input so that both required data elements were provided in one string. This creates a problem at the controller level where <a href="/code/intuit/cq5.bargraph.json.jpg" target="_blank">JSON data</a> from the user is parsed. Ideally, I simply parse the data and feed it to a Mustache template for rendering. In this case, once the data is parsed, it has to be re-structured so that it can be understood by the <a href="/code/intuit/jcr_root/etc/designs/harmony/mustache_templates/harmony_cms/components/resp/misc/__features_bar_graph.html.mustache" target="_blank">Mustache template</a>. This is shown in the <a href="/code/intuit/features_bar_graph.rb.html" target="_blank">controller code</a> (def bar_data_hash).<br/><br/>Finally, as seen in the <a href="/code/intuit/cq5.bargraph.json.jpg" target="_blank">JSON data</a>, the bar graph component generates an array with multiple strings with elements. This dictates what happens in the controller as I manipulate arrays of data. In the case of entering data for a single element bar graph, an error is thrown. The JSON data generates a single string, not an array with a single string element. Now I have to implement object detection and handle the data in two different ways before re-structuring. This is shown in the <a href="/code/intuit/features_bar_graph.rb.html" target="_blank">controller code</a> (def bar_data_hash).<br/><br/>The challenge with CQ5 is solving web development issues with a subset of the traditional tools and techniques one is accustomed to. CQ5 (and Ruby) was brand new to the entire Front End Development team; we had no context. In the end, documenting issues into best practices as described above proved fruitful as new developers were hired.</span></p>'
						},
						{
							"name":"blyve",
							"class":"two",
							"font-awesome":"fa-users",
							"display":"Blyve",
							"content":'<p classs="task"><span>TASK</span><span>Creation of a Real-Time Web and Mobile Application</span></p><p class="tech"><span>TECHNOLOGY</span><span>In early 2008, I was given funding to co-found a company that would provide live coverage of any event via mobile browser. Live coverage would be provided in the form of play by play text, images, binary files, and video snippets from one’s mobile web browser. NodeJs, jQuery and YUI were in their infancy. I needed to get something out quickly. The only way I could accomplish this was "<a href="/code/blyve/gsnap.js" target="_blank">polling</a>" using the setInterval method and xmlHTTPRequest (later we would incorporate YUI as more of a ‘strategic’ move).</span></p><p class="prob"><span>PROBLEM</span><span>To provide a high quality experience, on user input, I updated the DOM first (comments, scoreboard, headline), made the XHR request, then redrew the same elements on successful response. Users loved the speed of the application but a code maintenance nightmare was created: any changes to markup had to be made in two places causing delays in development. Eventually we removed this first step (DOM update) and unrelied on updating the DOM on successful xmlHTTPRequest only.<br/><br/>As we grew, polling caused enormous amounts of stress on our servers. We polled for new data on the client every 4 secs. Code was created to measure inactivity and decrease the polling rate based on inactivity. This worked great for events with smaller number of users. Unfortunately, this still did not scale well for events with more than 1,000 viewers.<br/><br/>To provide more "runway", I trained another developer and left the company. During this time, I authorized the move to NodeJS to replace polling creating a true real-time application that we re-branded as <a href="http://blyve.com" target="_blank">Blyve</a>. This also included the migrating to a single plage application approach using BackboneJS. My role became more of promoter/fundraiser/entrepreneur but I did get a chance to code in this new environment. I created "tickers" which allowed a user to map a new, unique broadcast event to a consistent URL. This can been in the BackboneJS code by searching on "<a href=\'/code/blyve/blyve-dashboard.js\' target="_blank">DashboardEventsTickers</a>."</span></p>'
						},
						{
							"name":"aol",
							"class":"three",
							"font-awesome":"fa-map-marker",
							"display":"AOL",
							"content":'<p classs="task"><span>TASK</span><span>Create Innovative Prototypes with AOL Products</span></p><p class="tech"><span>TECHNOLOGY</span><span>Working for AOL&rsquo;s Innovation Lab, my job was simply to experiment with anything and everything. I focused on two techonlogies that interested me: real-time applications with NodeJS and the Mapquest API.</span></p><p class="prob"><span>PROBLEM</span><span>AOL Social Day: The company wanted to celebrate the launching of bit.ly’s new URL “aol.it” so they created a “link sharing” contest for AOL employees. The requirements were as follows:<ol><li>Find an AOL website link you want to share, shorten it with bit.ly. Bit.ly will convert this to a unique “aol.it/{id}”</li><li>Share on FB, Twitter or email</li><li>Each time the new “aol.it/{id}” link has a unique click, the AOL employee gets credited with 1 click</li><li>At the end of the one week, whomever has highest number of unique clicks wins a trip to the the World Series</li></ol><p>The following was provided:<p><ol><li>A pubsub feed of “aol.it” links that have been clicked</li><li>A link to a restful API that gave a list of AOL employees and their AOL email addresses</li></ol><p>I recognized that this was a real-time application perfect for NodeJs. The algorithm was as follows:</p><ol><li>Create a data structure that maps AOL Employee names to their AOL email addresses</li><li>Stream in the data from the pubsub feed</li><li>Parse the data and check against employee/email data structure</li><li>Is this unique click on an “aol.it” link created by an AOL employeee? yes, update a separate database</li><li>Create a separate page that reads this database, creates a leaderboard with who has the most clicks, and display</li></ol><p>The result was the Javascript code written for <a href="/code/aol/js/socialday.js" target="_blank">AOL SocialDay</a>, a project that proved to be successful in that it placed NodeJS on the radar at AOL.</p><p>AOL Sports Swipe: I wanted to create different way of viewing sports scores. This is 2010 so tablets were the “hot” item. My vision was to skim sports scores by simply panning a U.S. map via a tablet finger swipe.</p><p>This involved using the MapQuest API (an AOL company) and the FanFeedr API for Sports (no longer exists). The marker was always the center of the screen. I used the navigator.geolocation.getCurrentPosition() method to get the marker&rsquo;s map coordinates as I panned. This provided the latitude and longitude coordinates and passed them to the FanFeedr API, Once I had the coordinates, I could make an API request for sports information based on said coordinates. The response was in the form of sports data relevant to said coordinates. A resuling dialog box “visualized” sports data based on geo-location. In effect, I had created a new way of searching for sports news, scores, etc.</p><p>For demonstration purposes, I swapped out the FanFeedr API calls with those of the "<A href="http://www.thepaperboy.com/api/" target="_blank">The Paperboy</a>" API that returns all local newspapers within a 30 km radius of the map marker. I also used the more commonly used Google Maps API. The "<a href="/gms/" target="_blank">Local Newspapers by Geo-Location Prototype</a>" can be viewed in desktop, tablet, or mobile browser.</p></span></p>'
						},
						{
							"name":"interests",
							"class":"two",
							"font-awesome":"fa-heart",
							"display":"Interests",
							"content": '<div class="4u 12u$(mobile)"><article class="item"><a href="/img/alc.day4a.jpg" class="image fit" target="_blank"><img src="/img/blank.gif" data-src="/img/alc.day4a.jpg" class="lazy" alt="" /></a><header><h3><a href="http://svlatino.com/rich-garcia-applies-entrepreneur-skills-for-a-worthy-cause" target="_blank">AIDS Lifecycle 2015 (SF to LA):<br/>Day 4, Jolon, CA</a></h3></header></article><article class="item"><a href="/img/alc.day7a.jpg" class="image fit" target="_blank"><img src="/img/blank.gif" data-src="/img/alc.day7a.jpg" class="lazy" alt="" /></a><header><h3><a href="http://svlatino.com/rich-garcia-applies-entrepreneur-skills-for-a-worthy-cause" target="_blank">AIDS Lifecycle 2015 (SF to LA):<br/>Day 7, Los Angeles, CA</a></h3></header></article></div><div class="4u 12u$(mobile)"><article class="item"><a href="/img/rich.erich.space.jpg" class="image fit" target="_blank"><img src="/img/blank.gif" data-src="/img/rich.erich.space.jpg" class="lazy" alt="" /></a><header><h3><a href="https://www.youtube.com/watch?v=7_JTXEDH168" target="_blank">VIDEO:<br/>Do-it-Yourself Space Travel<a/></h3></header></article><article class="item"><a href="/img/wisd.space.jpg" class="image fit" target="_blank"><img src="/img/blank.gif" data-src="/img/wisd.space.jpg" class="lazy" alt="" /></a><header><h3><a href="https://www.youtube.com/watch?v=GiGyR7fvTlw" target="_blank">VIDEO:<br/>Project Cangrejo Documentary</a></h3></header></article></div><div class="4u$ 12u$(mobile)"><article class="item"><a href="https://www.youtube.com/watch?v=QldWTVju_uk" class="image fit" target="_blank"><img src="/img/blank.gif" data-src="/img/kltv.png" class="lazy" alt="" /></a><header><h3><a href="https://www.youtube.com/watch?v=QldWTVju_uk" target="_blank">VIDEO:<br/>"Almost Astronauts"</a></h3></header></article><article class="item"><a href="https://www.youtube.com/watch?v=GiGyR7fvTlw" class="image fit" target="_blank"><img src="/img/blank.gif" data-src="/img/wisd.vision.gif" class="lazy" alt="" /></a><header><h3><a href="https://www.youtube.com/watch?v=GiGyR7fvTlw" target="_blank">VIDEO:<br/>"Weslaco Students in Space"</a></h3></header></article></div>'
						},
						{
							"name":"contact",
							"class":"three",
							"font-awesome":"fa-envelope",
							"display":"Contact",
							"content":'<p>Phone: <a href="javascript:void(0);" class="phone">click to show</a></p><p>Email: <a href="javascript:void(0);" class="email">click to show</a></p>'
						},
						{
							"name":"footer",
							"class":"one dark cover",
							"font-awesome":"",
							"display":"",
							"content":'<p>&copy; <cite id="copyright">'+year+'</cite> Richard L. Garcia. All rights reserved.</p>'
						}
					]
				}
		// bug when navlet creates "footer nav", not needed so remove it, iterate on new list
		model.navlet = _.initial(model.project);

	return model;

})();