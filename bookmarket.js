// Main code version
javascript:(function(){
  try {
    const mainUrl = 'https://manganato.com/bookmark';
    const bookmarkUrl = 'https://manganato.com/bookmark?page=';
    if (String(window.location).startsWith(mainUrl)) {
      const element = document.getElementsByClassName('page-last')[0];
      const lastPage = element.innerHTML.replace(/[^0-9]/g, '');
 
      const res = document.createElement('div');
      res.id = 'bookmark-results';
      document.body.appendChild(res);

      const bookmarksArray = [];

      let i = 1;

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      function formatBookmarks(bookmarks) {
        const b = document.createElement('textarea');
        b.value = bookmarks.join("\n");
        b.setAttribute('readonly', true);

        document.body.appendChild(b).select();
        document.execCommand('copy');
        document.body.removeChild(b);
      }

      function load() {
        $('#bookmark-results').load(`${bookmarkUrl}${i} .bookmark-item`, function(response, status, xhr) {
          $('.bookmark-item').each(function(index) {
            let title = $(this).find('.item-story-name').html();
            let viewed = $(this).find('.item-title.text-nowrap:nth-child(even)').find('a').html();
            if (viewed.includes(':')) {
              viewed = viewed.slice(0, viewed.indexOf(':'));
            }
            let current = $(this).find('.item-title.text-nowrap:nth-child(odd)').find('a').html();
            if (current.includes(':')) {
              current = current.slice(0, current.indexOf(':'));
            }
            bookmarksArray.push(`${title} - ${viewed} / ${current}`);
          });

          if (i <= lastPage) {
            i++;
            load();
          } else {
            let bookmarks = bookmarksArray.filter(onlyUnique);
            formatBookmarks(bookmarks);
            document.body.removeChild(res);
          }
        });
      }
      
      load();
    } else {
      throw 'Must be on Manganato bookmarks page to work!';
    }
  } catch (err) {
    alert(err);
  }
})();

// Minified version
javascript:(function(){try{const t="https://manganato.com/bookmark",e="https://manganato.com/bookmark?page=";if(!String(window.location).startsWith(t))throw"Must be on Manganato bookmarks page to work!";{const t=document.getElementsByClassName("page-last")[0].innerHTML.replace(/[^0-9]/g,""),o=document.createElement("div");o.id="bookmark-results",document.body.appendChild(o);const n=[];let a=1;function onlyUnique(t,e,o){return o.indexOf(t)===e}function formatBookmarks(t){const e=document.createElement("textarea");e.value=t.join("\n"),e.setAttribute("readonly",!0),document.body.appendChild(e).select(),document.execCommand("copy"),document.body.removeChild(e)}function load(){$("#bookmark-results").load(`${e}${a} .bookmark-item`,function(e,i,d){if($(".bookmark-item").each(function(t){let e=$(this).find(".item-story-name").html(),o=$(this).find(".item-title.text-nowrap:nth-child(even)").find("a").html();o.includes(":")&&(o=o.slice(0,o.indexOf(":")));let a=$(this).find(".item-title.text-nowrap:nth-child(odd)").find("a").html();a.includes(":")&&(a=a.slice(0,a.indexOf(":"))),n.push(`${e} - ${o} / ${a}`)}),a<=t)a++,load();else{formatBookmarks(n.filter(onlyUnique)),document.body.removeChild(o)}})}load()}}catch(t){alert(t)}})();
