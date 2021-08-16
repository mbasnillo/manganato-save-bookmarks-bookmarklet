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
