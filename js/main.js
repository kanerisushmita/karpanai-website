/* ==========================================================================
   KARPANAI FOUNDATION — main.js
   jQuery-powered playful interactions
   ========================================================================== */
$(function () {

  /* ---------------- Mobile nav toggle ---------------- */
  $('#navToggle').on('click', function () {
    $('#navLinks').toggleClass('open');
    $(this).attr('aria-expanded', $('#navLinks').hasClass('open'));
  });
  $('#navLinks a').on('click', function () {
    $('#navLinks').removeClass('open');
  });

  /* ---------------- Active nav link ---------------- */
  var here = (location.pathname.split('/').pop() || 'index.html');
  $('.nav-links a').each(function () {
    var href = $(this).attr('href');
    if (href === here || (here === '' && href === 'index.html')) {
      $(this).addClass('active');
    }
  });

  /* ---------------- Scroll reveal + doodle underline ---------------- */
  var revealTargets = $('.reveal, .doodle-underline');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    revealTargets.each(function () { io.observe(this); });
  } else {
    revealTargets.addClass('in-view');
  }

  /* ---------------- Animated counters (stat numbers) ---------------- */
  function animateCount($el) {
    var raw = $el.data('count');
    if (raw === undefined) return;
    var suffix = $el.data('suffix') || '';
    var prefix = $el.data('prefix') || '';
    var target = parseFloat(raw);
    var isDecimal = raw.toString().indexOf('.') > -1;
    var start = 0;
    var duration = 1400;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = start + (target - start) * eased;
      $el.text(prefix + (isDecimal ? value.toFixed(2) : Math.floor(value)) + suffix);
      if (progress < 1) requestAnimationFrame(step);
      else $el.text(prefix + (isDecimal ? target.toFixed(2) : target) + suffix);
    }
    requestAnimationFrame(step);
  }

  var counted = false;
  var $stats = $('.stat .num[data-count]');
  if ($stats.length && 'IntersectionObserver' in window) {
    var statIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counted) {
          counted = true;
          $stats.each(function () { animateCount($(this)); });
        }
      });
    }, { threshold: 0.3 });
    statIO.observe($stats.get(0).closest('section') || $stats.get(0));
  }

  /* ---------------- Subject picker (home hero interactive) ---------------- */
  var subjectData = {
    history:  { title: 'History → Theatre', text: 'Your students step inside a historical moment and play it out — not memorise the date it happened.' },
    geography:{ title: 'Geography → Song', text: 'Maps turn into melodies. Students write songs about the places, rivers and neighbourhoods they actually live in.' },
    civics:   { title: 'Civics → Debate', text: 'The Constitution stops being a chapter to recite. Students argue, defend and roleplay the rights they are learning about.' },
    justice:  { title: 'Social Justice → Story', text: 'Big issues get a human face. Students write short stories that explore the fairness questions around them.' },
    identity: { title: 'Identity → Poem', text: 'Who am I, and where do I belong? Students find the words for it — often for the first time.' }
  };
  var $pickerBtns = $('.picker-btn');
  var $stageTitle = $('#pickerTitle');
  var $stageText = $('#pickerText');
  $pickerBtns.on('click', function () {
    var key = $(this).data('subject');
    if (!subjectData[key]) return;
    $pickerBtns.removeClass('active');
    $(this).addClass('active');
    $stageTitle.fadeOut(120, function () {
      $stageTitle.text(subjectData[key].title).fadeIn(180);
    });
    $stageText.fadeOut(120, function () {
      $stageText.text(subjectData[key].text).fadeIn(180);
    });
  });

  /* ---------------- Flipbook (Method section) ---------------- */
  $('.flip-card').on('click', function () {
    $(this).toggleClass('flipped');
  });

  /* ---------------- Story category tabs ---------------- */
  $('.story-tab').on('click', function () {
    var cat = $(this).data('cat');
    $('.story-tab').removeClass('active');
    $(this).addClass('active');
    if (cat === 'all') {
      $('.story-card').fadeIn(200);
    } else {
      $('.story-card').each(function () {
        if ($(this).data('cat') === cat) $(this).fadeIn(200);
        else $(this).fadeOut(150);
      });
    }
  });

  /* ---------------- Copy-to-clipboard (donate page) ---------------- */
  $('.copy-btn').on('click', function () {
    var text = $(this).data('copy');
    var $btn = $(this);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        var original = $btn.text();
        $btn.text('Copied!');
        setTimeout(function () { $btn.text(original); }, 1500);
      });
    }
  });

  /* ---------------- Contact / newsletter form (demo submit) ---------------- */
  $('.js-form').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    $form.find('.form-submit').prop('disabled', true).text('Sending…');
    setTimeout(function () {
      $form.slideUp(200);
      $form.siblings('.form-success').slideDown(220);
    }, 700);
  });

  /* ---------------- Back to top ---------------- */
  var $toTop = $('#toTop');
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 500) $toTop.addClass('show');
    else $toTop.removeClass('show');
  });
  $toTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  /* ---------------- "What would you change?" canvas ---------------- */
  var canvas = document.getElementById('imaginationCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var drawing = false;
    var currentColor = '#172B4D';
    var last = { x: 0, y: 0 };

    function resizeCanvas() {
      var ratio = window.devicePixelRatio || 1;
      var rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      ctx.scale(ratio, ratio);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = 4;
    }
    resizeCanvas();
    window.addEventListener('resize', function () {
      var imgData = canvas.toDataURL();
      resizeCanvas();
      var img = new Image();
      img.onload = function () { ctx.drawImage(img, 0, 0, canvas.width, canvas.height); };
      img.src = imgData;
    });

    function getPos(evt) {
      var rect = canvas.getBoundingClientRect();
      var clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
      var clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    }
    function start(evt) {
      drawing = true;
      last = getPos(evt);
    }
    function move(evt) {
      if (!drawing) return;
      evt.preventDefault();
      var pos = getPos(evt);
      ctx.strokeStyle = currentColor;
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      last = pos;
    }
    function end() { drawing = false; }

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start, { passive: true });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);

    $('.color-dot').on('click', function () {
      $('.color-dot').removeClass('active');
      $(this).addClass('active');
      currentColor = $(this).data('color');
    });
    $('#clearCanvas').on('click', function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  }

});
