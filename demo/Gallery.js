var Gallery = function (evt, m, options) {
    "use strict";
    var img = document.createElement('img'),
    a = document.createElement('a'),
    frag = document.createDocumentFragment(),
    li = document.createElement('li'),
    img1 = document.createElement("img");
    var len = options.images.length,
        cur = -1,
        curImg = null,
        walk = function (dir) {
            if (cur === -1 && dir === -1) {
                cur = 0;
            }

            cur += dir;

            if (cur === -1 || cur === len) {
                cur -= len * dir;
            }

            curImg = options.gallery.childNodes[cur].childNodes[0].childNodes[0];
            m.setThumb(curImg);

            options.gallery.parentNode.scrollTop = (curImg.offsetHeight) * cur;
            options.previewText.childNodes[0].nodeValue = options.images[cur].title;
        };

        this.render = function () {
            var i = 0;
    
            for (i; i < len; i += 1) {
                li = li.cloneNode(false);
                a = a.cloneNode(false);
                img = img.cloneNode(false);
    
                a.href = options.images[i].url;
                a.title = options.images[i].title;
                img.src = options.images[i].thumb;
                img.setAttribute('data-large-img-url', options.images[i].large);
                img.className = 'img';
                img.id = 'img-' + i;
    
                a.appendChild(img);
                li.appendChild(a);
                console.log(img.src);
                frag.appendChild(li);
            }
    
            options.gallery.appendChild(frag);
    
            walk(1);
    
            m.attach({
                thumb: '.img',
                zoomable: true
            });
        };
    var render1 = function () {
        var i = 0,
            frag = document.createDocumentFragment(),
            li = document.createElement('li'),
            //a = document.createElement('a'),
            canvas = document.createElement('canvas');
            //img = document.createElement('img'),
            //img1 = document.createElement("img");

        for (i; i < len; i += 1) {
            li = li.cloneNode(false);
            a = a.cloneNode(false);
            canvas = canvas.cloneNode(false);
            img = img.cloneNode(false);
            img1 = img1.cloneNode(false);
            changeColor(canvas,img,img1,a,i).toDataURL();
            a.href = options.images[i].url;
            a.title = options.images[i].title;
            img.src = options.images[i].thumb;
            //img1.src = options.images[i].thumb;
            img.setAttribute('data-large-img-url', options.images[i].large);
            img.className = 'img';
            img.id = 'img-' + i;
            a.appendChild(img1);
            li.appendChild(a);

            frag.appendChild(li);
        }

        options.gallery.appendChild(frag);

        walk(1);

        m.attach({
            thumb: '.img1',
            zoomable: true
        });
    };

    var changeColor = function(canvas, img,img1,a,j){
        var ctx= canvas.getContext("2d");
        img.crossOrigin = "anonymous";
        // When the image has loaded
        img.onload = function(){
            // Draw it and get it's data
            canvas.width=img.width;
            canvas.height=img.height;
            var w = canvas.width / 3;
            ctx.drawImage(img, 0, 0);
            var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height),
                data = imgData.data;

            // Iterate over all the pixels
            for (var i = 0; i < data.length; i += 4) {
                // The current pixels' x position
                var x = Math.floor(i / 4) % canvas.width;

                //Set the pixels' r, g, b channels if x is within certain bounds.
                if(x < w)
                    data[i] = 255;   // Red
                else if(x >= w && x < w * 2)
                    data[i+1] = 255; // Green
                else
                    data[i+2] = 255; // Blue
            }

            // Re-draw the image.
            ctx.putImageData(imgData, 0, 0);

            
            img1.src = canvas.toDataURL();
            //console.log(img1);
            //a.appendChild(img1);
            //console.log(options.images[j]);
            img1.setAttribute('data-large-img-url', img1.src);
            img1.className = 'img1';
            img1.id = 'img1-' + j;
            m.attach({
                thumb: '.img1',
                zoomable: true
            });
            
                
        }
        
        //console.log(ctx.getImageData(0,0,canvas.width,canvas.height));
        return canvas;
    }

    this.next = function () {
        walk(1);
    };

    this.prev = function () {
        walk(-1);
    };
    this.change = function(){
        console.log(options.gallery);
        options.gallery.removeChild(options.gallery.childNodes[0]);
        console.log(options.gallery);
        options.gallery.removeChild(options.gallery.childNodes[0]);
        console.log(options.gallery);
        options.gallery.removeChild(options.gallery.childNodes[0]);
        console.log(options.gallery);
        options.gallery.removeChild(options.gallery.childNodes[0]);
        console.log(options.gallery);
        options.gallery.removeChild(options.gallery.childNodes[0]);
        console.log(options.gallery);
        options.gallery.removeChild(options.gallery.childNodes[0]);
        console.log(options.gallery);
        options.gallery.removeChild(options.gallery.childNodes[0]);
        console.log(options.gallery);
        render1();
    }

    evt.attach('mousedown', options.prev, this.prev);
    evt.attach('mousedown', options.next, this.next);
    evt.attach('mousedown', options.change, this.change);

    this.render();
    
};