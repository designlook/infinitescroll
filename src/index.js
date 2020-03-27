var scroller = document.querySelector("#root");
var sentinel = document.querySelector("#sentinel");
var total = 1;
var loading = false;

function getContent(offset, num) {
  loading = true;
  let arr = [];
  total = offset + num;
  for (var i = offset; i < offset + num; i++) {
    arr.push(i);
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(arr);
    }, Math.random() * 2000);
  });
}

var loadItems = function(items) {
  items.map(item => {
    console.log(item);
    var newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.innerHTML = item;
    scroller.appendChild(newItem);
    return scroller.appendChild(sentinel);
  });
  loading = false;
};

var intersectionObserver = new IntersectionObserver(entries => {
  if (!loading && entries.some(entry => entry.intersectionRatio > 0)) {
    console.log("loading...");
    getContent(total, 3).then(response => {
      loadItems(response);
    });
  }
});

intersectionObserver.observe(sentinel);
