using YoshkarOla.API.Models;

namespace YoshkarOla.API.Data;

public static class SeedData
{
    public static void Initialize(AppDbContext db)
    {
        if (db.Attractions.Any()) return;

        SeedAttractions(db);
        db.SaveChanges();

        SeedAttractionsBatch2(db);
        db.SaveChanges();

        SeedAttractionsBatch3(db);
        db.SaveChanges();

        SeedHotels(db);
        db.SaveChanges();

        SeedHotelsBatch2(db);
        db.SaveChanges();

        SeedHotelsBatch3(db);
        db.SaveChanges();

        SeedRestaurants(db);
        db.SaveChanges();

        SeedEvents(db);
        db.SaveChanges();

        SeedEventsBatch2(db);
        db.SaveChanges();
    }

    private static void SeedAttractions(AppDbContext db)
    {
        db.Attractions.AddRange(
            new Attraction
            {
                Name = "Набережная Брюгге",
                Description = "Визитная карточка Йошкар-Олы — набережная реки Малая Кокшага, застроенная зданиями во фламандском стиле. Фасады домов напоминают архитектуру бельгийского города Брюгге — отсюда и название. Здесь расположены министерства, ведомства и жилые дома. Набережная особенно красива вечером при подсветке и является самым фотографируемым местом города.",
                ShortDescription = "Набережная во фламандском стиле — визитная карточка города",
                Address = "наб. Брюгге, Йошкар-Ола",
                Latitude = 56.6322,
                Longitude = 47.8862,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/574/520_614_2/574de3eff6f6d42edbfd0726ede91190.png",
                Category = "Архитектура",
                Rating = 4.8,
                WorkingHours = "Круглосуточно",
                IsFree = true
            },
            new Attraction
            {
                Name = "Площадь Оболенского-Ноготкова",
                Description = "Центральная площадь города, названная в честь первого воеводы Царевококшайска. Здесь расположена Национальная художественная галерея с копией Царь-пушки, памятник основателю города и часы с движущимися фигурками, которые каждый час разыгрывают сценку с осликом — «Часы с осликом» (12 апостолов). Площадь является отправной точкой для туристических маршрутов.",
                ShortDescription = "Центральная площадь с галереей и уникальными часами",
                Address = "пл. Оболенского-Ноготкова, 3, Йошкар-Ола",
                Latitude = 56.6316,
                Longitude = 47.8869,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/f68/520_614_2/f687466baea3355dc13b746d61ed10c8.png",
                Category = "Площади",
                Rating = 4.7,
                WorkingHours = "Круглосуточно",
                IsFree = true
            },
            new Attraction
            {
                Name = "Благовещенская башня",
                Description = "Копия Спасской башни Московского Кремля, но в уменьшенном размере (высота 55 м против 71 м оригинала). Башня стоит на площади Республики и Пресвятой Девы Марии. Оснащена курантами, которые бьют каждый час. Строительство завершено в 2007 году. Является одним из символов нового облика Йошкар-Олы.",
                ShortDescription = "Копия Спасской башни Московского Кремля с курантами",
                Address = "пл. Республики и Пресвятой Девы Марии, Йошкар-Ола",
                Latitude = 56.6310,
                Longitude = 47.8857,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/4b0/520_614_2/wzylrn2nzds4jc1sobcqy1906fnc3jdf.jpg",
                Category = "Архитектура",
                Rating = 4.6,
                WorkingHours = "Круглосуточно (внутрь — закрыта)",
                IsFree = true
            },
            new Attraction
            {
                Name = "Театральный мост",
                Description = "Пешеходный мост через реку Малая Кокшага, соединяющий набережную Брюгге с Патриаршей площадью. С моста открывается великолепный вид на обе набережные. Мост украшен фонарями и является популярным местом для прогулок и фотосессий. Рядом расположены основные достопримечательности города.",
                ShortDescription = "Пешеходный мост с видом на набережные",
                Address = "Театральный мост, Йошкар-Ола",
                Latitude = 56.6318,
                Longitude = 47.8870,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/8f1/520_614_2/0sxac0zqx2ba7la731wegfky4zeubi7p.jpg",
                Category = "Архитектура",
                Rating = 4.5,
                WorkingHours = "Круглосуточно",
                IsFree = true
            },
            new Attraction
            {
                Name = "Собор Благовещения Пресвятой Богородицы",
                Description = "Кафедральный собор, построенный в 2016 году на берегу Малой Кокшаги. Архитектура храма напоминает собор Василия Блаженного в Москве в сочетании с элементами итальянского ренессанса. Высота колокольни — 74 метра. Внутри — богатое убранство с иконами и фресками. Рядом с собором установлен памятник Пресвятой Богородице.",
                ShortDescription = "Кафедральный собор с 74-метровой колокольней",
                Address = "наб. Воскресенская, Йошкар-Ола",
                Latitude = 56.6325,
                Longitude = 47.8884,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/63e/520_614_2/4hswsx69a139do32z59ju24bb2ru5kz2.jpg",
                Category = "Храмы",
                Rating = 4.9,
                WorkingHours = "08:00–19:00",
                IsFree = true
            },
            new Attraction
            {
                Name = "Национальная художественная галерея",
                Description = "Главный музей изобразительного искусства Республики Марий Эл, расположенный в венецианском дворце на площади Оболенского-Ноготкова. Коллекция включает произведения русского и марийского искусства, живопись, графику и скульптуру. Перед зданием установлена копия Царь-пушки. Регулярно проводятся временные выставки современного искусства.",
                ShortDescription = "Музей изобразительного искусства в венецианском дворце",
                Address = "пл. Оболенского-Ноготкова, 3, Йошкар-Ола",
                Latitude = 56.6314,
                Longitude = 47.8872,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/f68/520_614_2/f687466baea3355dc13b746d61ed10c8.png",
                Category = "Музеи",
                Rating = 4.4,
                WorkingHours = "Вт–Вс 10:00–18:00, Пн — выходной",
                IsFree = false
            },
            new Attraction
            {
                Name = "Царевококшайский кремль",
                Description = "Историко-культурный комплекс, воссозданный в 2009 году на месте древней крепости. Кремль представляет собой замкнутый двор с крепостными стенами и четырьмя башнями. Внутри — церковь, археологические находки и экспозиция об истории Царевококшайска (старое название Йошкар-Олы). Летом здесь проводятся ярмарки и фестивали.",
                ShortDescription = "Воссозданная историческая крепость с музеем",
                Address = "ул. Вознесенская, 49, Йошкар-Ола",
                Latitude = 56.6340,
                Longitude = 47.8903,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/55a/520_614_2/55a9b5f05127187e75551bc12041a0fe.png",
                Category = "Музеи",
                Rating = 4.3,
                WorkingHours = "Вт–Вс 10:00–18:00",
                IsFree = true
            },
            new Attraction
            {
                Name = "Памятник Йошкину коту",
                Description = "Бронзовая скульптура кота, сидящего на скамейке, установлена у входа в Марийский государственный университет в 2011 году. Самый популярный неформальный символ города. Название — игра слов: «Йошкин кот» — производное от «Йошкар-Ола» и известного русского фразеологизма. По традиции нужно потереть нос коту на удачу.",
                ShortDescription = "Самый популярный памятник города — бронзовый кот на скамейке",
                Address = "ул. Ленина, 24, Йошкар-Ола",
                Latitude = 56.6295,
                Longitude = 47.8964,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/bb2/520_614_2/djq8rzy7jg3hmzaotfodkqyldwa83ih1.jpg",
                Category = "Памятники",
                Rating = 4.7,
                WorkingHours = "Круглосуточно",
                IsFree = true
            },
            new Attraction
            {
                Name = "Архангельская слобода",
                Description = "Комплекс зданий на берегу Малой Кокшаги, выполненный в стиле немецкой и голландской архитектуры. Здания напоминают средневековые европейские дома с ярким фасадами и остроконечными крышами. Особенно впечатляюще слобода выглядит с противоположного берега реки. В зданиях расположены государственные учреждения.",
                ShortDescription = "Комплекс зданий в стиле немецкой и голландской архитектуры",
                Address = "ул. Архангельская, Йошкар-Ола",
                Latitude = 56.6330,
                Longitude = 47.8850,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/848/520_614_2/r9yh5jro8vj5eb4rxjvqlroaf3wwnp53.jpg",
                Category = "Архитектура",
                Rating = 4.5,
                WorkingHours = "Круглосуточно",
                IsFree = true
            },
            new Attraction
            {
                Name = "Парк культуры и отдыха",
                Description = "Центральный парк Йошкар-Олы, расположенный на берегу Малой Кокшаги. Популярное место для прогулок горожан и туристов. На территории — аттракционы, колесо обозрения, кафе, зоны для пикника и детские площадки. Летом работают лодочная станция и прокат велосипедов. Зимой — каток и лыжные трассы.",
                ShortDescription = "Главный парк города с аттракционами на берегу реки",
                Address = "ул. Первомайская, 43, Йошкар-Ола",
                Latitude = 56.6280,
                Longitude = 47.8820,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/f3c/520_614_2/f3c0eb4bab3b0477d6fad90da13c202b.png",
                Category = "Парки",
                Rating = 4.2,
                WorkingHours = "06:00–23:00",
                IsFree = true
            }
        );
    }

    private static void SeedAttractionsBatch2(AppDbContext db)
    {
        db.Attractions.AddRange(
            new Attraction
            {
                Name = "Патриаршая площадь",
                Description = "Пространство, где современная архитектура соседствует с духовными символами города. Здесь установлена крупнейшая в мире динамическая скульптурная композиция «Вход Господень во Иерусалим». Памятник Петру и Февронии, Республиканский театр кукол в стиле баварского замка, скульптура котёнка Барсика.",
                ShortDescription = "Площадь с крупнейшей в мире динамической скульптурой",
                Address = "Патриаршая площадь, Йошкар-Ола",
                Latitude = 56.6327,
                Longitude = 47.8855,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/771/520_614_2/vfsrsshc79qskqgfbno1ri1ku49w862m.jpg",
                Category = "Площади",
                Rating = 4.8,
                WorkingHours = "Круглосуточно",
                IsFree = true
            },
            new Attraction
            {
                Name = "Колесо обозрения",
                Description = "Колесо обозрения в Центральном парке Йошкар-Олы — одно из самых высоких в Поволжье. С верхней точки открывается панорама города: набережные, кремль, храмы и мосты. Вечером кабинки подсвечиваются, создавая яркое световое шоу.",
                ShortDescription = "Одно из самых высоких колёс обозрения в Поволжье",
                Address = "ул. Первомайская, 43, Йошкар-Ола",
                Latitude = 56.6278,
                Longitude = 47.8825,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/ada/520_614_2/5ife3nhfqt2am9patz2d9ud5wfdved01.jpg",
                Category = "Развлечения",
                Rating = 4.4,
                WorkingHours = "10:00–22:00",
                IsFree = false
            },
            new Attraction
            {
                Name = "Воскресенская набережная",
                Description = "Набережная правого берега Малой Кокшаги с видом на набережную Брюгге. Здесь расположены Воскресенский собор, Царевококшайский кремль и ряд исторических зданий. Пешеходная зона с лавочками и видовыми площадками.",
                ShortDescription = "Набережная с видом на Брюгге и историческими зданиями",
                Address = "наб. Воскресенская, Йошкар-Ола",
                Latitude = 56.6335,
                Longitude = 47.8895,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/e6b/520_614_2/dztmdkmgz4uy0zffkhy3ouvvk2eez5ot.jpg",
                Category = "Архитектура",
                Rating = 4.6,
                WorkingHours = "Круглосуточно",
                IsFree = true
            },
            new Attraction
            {
                Name = "Музей истории и археологии",
                Description = "Музей на набережной Брюгге с экспозициями, посвящёнными истории Марийского края от древних времён до наших дней. Археологические находки, предметы быта марийцев, документы и фотографии. Интерактивные экспонаты.",
                ShortDescription = "Музей истории Марийского края на набережной Брюгге",
                Address = "наб. Брюгге, 3, Йошкар-Ола",
                Latitude = 56.6323,
                Longitude = 47.8860,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/797/520_614_2/797e0ad37ea0c4f0f160aa1d74b2b4c4.png",
                Category = "Музеи",
                Rating = 4.3,
                WorkingHours = "Вт–Вс 10:00–18:00",
                IsFree = false
            },
            new Attraction
            {
                Name = "Троицкая церковь",
                Description = "Одна из старейших церквей Йошкар-Олы, построенная в 1736 году. Храм в стиле барокко с богатым внутренним убранством. Является памятником архитектуры федерального значения. Рядом расположен живописный сквер.",
                ShortDescription = "Старейшая церковь города 1736 года в стиле барокко",
                Address = "ул. Советская, 84, Йошкар-Ола",
                Latitude = 56.6342,
                Longitude = 47.8910,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/63e/520_614_2/4hswsx69a139do32z59ju24bb2ru5kz2.jpg",
                Category = "Храмы",
                Rating = 4.5,
                WorkingHours = "08:00–18:00",
                IsFree = true
            }
        );
    }

    private static void SeedAttractionsBatch3(AppDbContext db)
    {
        db.Attractions.AddRange(
            new Attraction
            {
                Name = "Дом-Одеколон",
                Description = "Необычное круглое здание, построенное в 2011 году. Получило народное название «Дом-Одеколон» из-за формы, напоминающей флакон одеколона. Жилой дом является одной из архитектурных достопримечательностей нового облика Йошкар-Олы.",
                ShortDescription = "Необычное круглое здание — архитектурная достопримечательность",
                Address = "ул. Эшкинина, Йошкар-Ола",
                Latitude = 56.6298,
                Longitude = 47.8942,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/8f1/520_614_2/6ekturyrptrgx3bkfqydgrv2880p63ja.jpg",
                Category = "Архитектура",
                Rating = 4.1,
                WorkingHours = "Круглосуточно (только снаружи)",
                IsFree = true
            },
            new Attraction
            {
                Name = "Итальянский парк",
                Description = "Уютный парк в итальянском стиле с фонтанами, скульптурами и аккуратными аллеями. Расположен рядом с набережной. Популярное место для прогулок и фотосессий. Особенно красив весной и летом.",
                ShortDescription = "Парк в итальянском стиле с фонтанами и скульптурами",
                Address = "ул. Гоголя, Йошкар-Ола",
                Latitude = 56.6305,
                Longitude = 47.8848,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/1e3/520_614_2/y5gggfouz1603zywpcnbnm582gdpyqlz.jpg",
                Category = "Парки",
                Rating = 4.3,
                WorkingHours = "Круглосуточно",
                IsFree = true
            },
            new Attraction
            {
                Name = "Спасская башня",
                Description = "Входная группа набережной Брюгге со стороны микрорайона Сомбатхей. Башня выполнена в стиле средневековой европейской архитектуры и является одним из узнаваемых элементов набережной.",
                ShortDescription = "Входная башня набережной Брюгге в средневековом стиле",
                Address = "наб. Брюгге, Йошкар-Ола",
                Latitude = 56.6319,
                Longitude = 47.8850,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/4b0/520_614_2/wzylrn2nzds4jc1sobcqy1906fnc3jdf.jpg",
                Category = "Архитектура",
                Rating = 4.4,
                WorkingHours = "Круглосуточно",
                IsFree = true
            },
            new Attraction
            {
                Name = "Памятник Кириллу и Мефодию",
                Description = "Бронзовый памятник создателям славянской письменности — святым равноапостольным Кириллу и Мефодию. Установлен на набережной в 2014 году. Является популярным местом для фотографий.",
                ShortDescription = "Памятник создателям славянской письменности на набережной",
                Address = "наб. Воскресенская, Йошкар-Ола",
                Latitude = 56.6332,
                Longitude = 47.8890,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/bb2/520_614_2/djq8rzy7jg3hmzaotfodkqyldwa83ih1.jpg",
                Category = "Памятники",
                Rating = 4.2,
                WorkingHours = "Круглосуточно",
                IsFree = true
            },
            new Attraction
            {
                Name = "Театральный мост (ночной вид)",
                Description = "Вечером Театральный мост преображается: включается подсветка, а набережные по обе стороны сияют огнями. Одно из лучших мест для вечерней прогулки и ночной фотосъёмки города.",
                ShortDescription = "Подсвеченный мост — лучшее место для вечерних прогулок",
                Address = "Театральный мост, Йошкар-Ола",
                Latitude = 56.6317,
                Longitude = 47.8868,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/8f1/520_614_2/0sxac0zqx2ba7la731wegfky4zeubi7p.jpg",
                Category = "Архитектура",
                Rating = 4.6,
                WorkingHours = "Круглосуточно",
                IsFree = true
            }
        );
    }

    private static void SeedHotels(AppDbContext db)
    {
        db.Hotels.AddRange(
            new Hotel
            {
                Name = "Azimut Отель Йошкар-Ола 4*",
                Description = "Azimut Hotels – одна из ведущих гостиничных сетей России, объединяющая более 70 отелей и санаториев в 50 городах. Azimut Отель Йошкар-Ола 4* – модный современный отель, расположенный в центре марийской столицы. От отеля можно за несколько минут дойти до Царевококшайского кремля, набережной Брюгге, Архангельской слободы, часов «12 апостолов» и знаменитого Йошкиного Кота. Номерной фонд — 45 номеров различных категорий от одноместных до президентского люкса. Ресторан «Траттория» предлагает блюда итальянской, европейской и национальной марийской кухни. Тренажёрный зал, кинозал «КиноКомпас» и конференц-зал «Меридиан» на 80 человек.",
                ShortDescription = "Современный 4-звёздочный отель сети Azimut в центре города",
                Address = "Воскресенский проспект, д. 11, Йошкар-Ола",
                Latitude = 56.6316,
                Longitude = 47.8867,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/429/520_332_2619711fa078991f0a23d032687646b21/dyb3jjnwcxn8h5sguyql9pttw9x3rup0.jpg",
                Stars = 4,
                Rating = 4.6,
                PriceFrom = 5500,
                Phone = "+7 (987) 701-14-23",
                Website = "https://azimuthotels.com/ru/yoshkar-ola/azimut-hotel-yoshkar-ola",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = true
            },
            new Hotel
            {
                Name = "Отель Rubiton 4*",
                Description = "Отель Rubiton 4* — первый четырёхзвёздочный отель в Йошкар-Оле, предлагающий 31 номер в категориях «Стандарт», «Джуниор Сюит» и «Люкс». Ресторан с изысканной кухней и разнообразным меню, услуга room-service, бесплатная большая парковка на территории. Тренажёрный зал фитнес-клуба «Эйфория». Конференц-зал для деловых мероприятий. Удобное расположение вблизи достопримечательностей города.",
                ShortDescription = "Первый 4-звёздочный отель Йошкар-Олы с рестораном и фитнесом",
                Address = "ул. Карла Либкнехта, д. 102, Йошкар-Ола",
                Latitude = 56.6220,
                Longitude = 47.8960,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/a1f/520_332_2619711fa078991f0a23d032687646b21/jxtibqqt8ijyjxl54q0yife6i0alt47v.webp",
                Stars = 4,
                Rating = 4.5,
                PriceFrom = 4800,
                Phone = "+7 (927) 728-63-50",
                Website = "https://rubiton.ru",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = true
            },
            new Hotel
            {
                Name = "Отель «Никитин» 3*",
                Description = "Отель «Никитин» — современный комфортабельный отель в центре столицы Марий Эл на бульваре Победы. Расположен в отреставрированном историческом здании. Напротив — стадион «Дружба». Через Центральный парк можно дойти до исторического центра: Театр оперы и балета, кафе «Старый Георг», ресторан «Камелот». Гипоаллергенное бельё из хлопкового сатина, экологичная косметика. Кафе «Лофт» в отеле. Отель поддерживает заповедник «Большая Кокшага».",
                ShortDescription = "Экологичный отель в историческом здании на бульваре Победы",
                Address = "бульвар Победы, д. 37, Йошкар-Ола",
                Latitude = 56.6280,
                Longitude = 47.8920,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/cbb/520_332_2619711fa078991f0a23d032687646b21/fxpfrv21ljvypnq1tb73vfkfbyk9ppt2.webp",
                Stars = 3,
                Rating = 4.4,
                PriceFrom = 3200,
                Phone = "+7 (964) 860-37-50",
                Website = "https://nikitinhotel.ru",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = true
            },
            new Hotel
            {
                Name = "АМАКС Сити Отель",
                Description = "«АМАКС Сити-отель» — один из крупнейших гостиничных комплексов республики. Железнодорожный и автовокзалы — в десяти минутах пешком. Набережная Брюгге, исторический центр, Дворец водных видов спорта и Ледовый дворец — в пешей доступности. Одноместные, двухместные, трёхместные номера, завтрак «шведский стол» включён. Эксклюзивные групповые скидки, единый тариф для групп от 100 человек. Ресторан с русской, европейской и марийской кухней. Банный комплекс «Акватур».",
                ShortDescription = "Крупнейший гостиничный комплекс рядом с вокзалами",
                Address = "ул. Карла Маркса, д. 109, Йошкар-Ола",
                Latitude = 56.6300,
                Longitude = 47.8940,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/e80/520_332_2619711fa078991f0a23d032687646b21/uxrrf1sczg9fc4w4siva19lpihmtum5d.jpg",
                Stars = 3,
                Rating = 4.1,
                PriceFrom = 2800,
                Phone = "+7 (921) 784-17-97",
                Website = "https://yoshkar-ola.amaks-hotels.ru",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = true
            },
            new Hotel
            {
                Name = "Отель «People Town»",
                Description = "В 2022 году в Йошкар-Оле появился современный отель People Town. 30 комфортабельных номеров — от практичных хостельного типа до роскошных апартаментов класса люкс. Шведский стол с горячими блюдами, ароматная выпечка, кофе и шампанское. Завтрак включён в стоимость. Парк Победы, стадион, Ледовый дворец, Центральный парк — всё рядом, пешком. До набережной Брюгге — 20 минут пешком. Парковка у входа.",
                ShortDescription = "Современный отель с 30 номерами и вкусными завтраками",
                Address = "ул. Зарубина, д. 35, Йошкар-Ола",
                Latitude = 56.6250,
                Longitude = 47.8980,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/488/520_332_2619711fa078991f0a23d032687646b21/hcq81egtc2ki2xjcxehnjz0b7sw04xdp.jpg",
                Stars = 3,
                Rating = 4.3,
                PriceFrom = 2500,
                Phone = "+7 (917) 070-04-08",
                Website = "https://yoshkar-ola.peoplehotel.ru",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = true
            }
        );
    }

    private static void SeedHotelsBatch2(AppDbContext db)
    {
        db.Hotels.AddRange(
            new Hotel
            {
                Name = "Отель «Онар» 3*",
                Description = "Отель «Онар» расположен в самом центре Йошкар-Олы, всего в 500 метрах от главных достопримечательностей. Комфортабельные номера различных категорий с современным ремонтом. Завтрак включён в стоимость проживания. Ресторан на первом этаже предлагает блюда русской и марийской кухни. Удобная транспортная доступность.",
                ShortDescription = "Отель в самом центре, 500 м от достопримечательностей",
                Address = "Йошкар-Ола, центр города",
                Latitude = 56.6325,
                Longitude = 47.8870,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/dc8/520_332_2619711fa078991f0a23d032687646b21/hpukysvyb67os1e2oshohncvvatkyfvo.jpg",
                Stars = 3,
                Rating = 4.2,
                PriceFrom = 3000,
                Phone = "+7 (8362) 42-09-09",
                Website = "",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = true
            },
            new Hotel
            {
                Name = "Бутик-отель «Stone» 3*",
                Description = "Бутик-отель «Stone» — стильный отель в 800 метрах от центра Йошкар-Олы. Элегантный авторский дизайн номеров, индивидуальный подход к каждому гостю. Высокий уровень сервиса, бесплатный Wi-Fi, парковка. Идеальный выбор для ценителей уюта и эстетики.",
                ShortDescription = "Стильный бутик-отель с авторским дизайном",
                Address = "Йошкар-Ола, 0,8 км от центра",
                Latitude = 56.6310,
                Longitude = 47.8850,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/d07/520_332_2619711fa078991f0a23d032687646b21/d07ca0b2cfa1541f8e6b20ba2919600e.jpg",
                Stars = 3,
                Rating = 4.5,
                PriceFrom = 3500,
                Phone = "+7 (8362) 46-00-46",
                Website = "",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = false
            },
            new Hotel
            {
                Name = "Отель «Вернисаж» 3*",
                Description = "Отель «Вернисаж» — уютный отель в 1,9 км от центра Йошкар-Олы. Номера с современным ремонтом и всеми удобствами. Бесплатный Wi-Fi и парковка. Завтрак включён. Хороший выбор для туристов и деловых путешественников.",
                ShortDescription = "Уютный отель с завтраком, 1.9 км от центра",
                Address = "Йошкар-Ола, 1,9 км от центра",
                Latitude = 56.6270,
                Longitude = 47.9000,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/35b/520_332_2619711fa078991f0a23d032687646b21/37warsge8hv036mm98stimkkany3g6qs.webp",
                Stars = 3,
                Rating = 4.1,
                PriceFrom = 2600,
                Phone = "+7 (8362) 45-55-45",
                Website = "",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = true
            },
            new Hotel
            {
                Name = "Отель 2020 3*",
                Description = "Отель 2020 — относительно новый отель в Йошкар-Оле, открытый в 2020 году. Современные номера, свежий ремонт, отличная звукоизоляция. Расположен в 1,7 км от центра города. Бесплатный Wi-Fi, парковка. Подходит для деловых поездок и туризма.",
                ShortDescription = "Новый отель 2020 года с современными номерами",
                Address = "Йошкар-Ола, 1,7 км от центра",
                Latitude = 56.6265,
                Longitude = 47.8950,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/3ae/520_332_2619711fa078991f0a23d032687646b21/6h50un05mezb7701nwoycwme3jsk0saz.jpg",
                Stars = 3,
                Rating = 4.3,
                PriceFrom = 2800,
                Phone = "+7 (8362) 20-20-20",
                Website = "",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = false
            },
            new Hotel
            {
                Name = "Отель «RGard»",
                Description = "Отель «RGard» расположен в 2,3 км от центра Йошкар-Олы. Современные комфортабельные номера разных категорий. Бесплатный Wi-Fi и парковка. Круглосуточная стойка регистрации. Хороший вариант для путешественников, ценящих спокойную обстановку.",
                ShortDescription = "Комфортабельный отель в спокойном районе",
                Address = "Йошкар-Ола, 2,3 км от центра",
                Latitude = 56.6240,
                Longitude = 47.9010,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/d05/520_332_2619711fa078991f0a23d032687646b21/d05e5ec390ed6c6e218b47275ff6c573.jpg",
                Stars = 3,
                Rating = 4.0,
                PriceFrom = 2400,
                Phone = "+7 (8362) 38-38-38",
                Website = "",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = false
            }
        );
    }

    private static void SeedHotelsBatch3(AppDbContext db)
    {
        db.Hotels.AddRange(
            new Hotel
            {
                Name = "Гостиница «Первый поезд» 3*",
                Description = "Гостиница «Первый поезд» — отель трёхзвёздочной категории в 2 км от центра Йошкар-Олы. Комфортные номера, бесплатный Wi-Fi и парковка. Удобное расположение для путешественников, прибывающих на поезде. Завтрак включён в стоимость.",
                ShortDescription = "Трёхзвёздочная гостиница, 2 км от центра",
                Address = "Йошкар-Ола, 2 км от центра",
                Latitude = 56.6235,
                Longitude = 47.8900,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/e87/520_332_2619711fa078991f0a23d032687646b21/e879bfef65e421ca5a87254b8da6bc9c.jpg",
                Stars = 3,
                Rating = 4.0,
                PriceFrom = 2200,
                Phone = "+7 (8362) 44-11-22",
                Website = "",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = false
            },
            new Hotel
            {
                Name = "Гостиница «Вирджиния» 3*",
                Description = "Гостиница «Вирджиния» — уютный отель в 1,3 км от центра Йошкар-Олы. Номера с современным ремонтом и всеми удобствами. Завтрак включён, бесплатный Wi-Fi, парковка. Рядом — основные достопримечательности города.",
                ShortDescription = "Уютная гостиница в 1,3 км от центра",
                Address = "Йошкар-Ола, 1,3 км от центра",
                Latitude = 56.6295,
                Longitude = 47.8915,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/ca7/520_332_2619711fa078991f0a23d032687646b21/ca7a8c98ad76a8ba3d12fa65da959cc4.jpg",
                Stars = 3,
                Rating = 4.2,
                PriceFrom = 2800,
                Phone = "+7 (8362) 45-00-00",
                Website = "",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = true
            },
            new Hotel
            {
                Name = "Гостиничный комплекс «Корона» 3*",
                Description = "Гостиничный комплекс «Корона» — трёхзвёздочный отель в 2,2 км от центра Йошкар-Олы. Номера различных категорий, ресторан на территории, банкетный зал. Бесплатный Wi-Fi и парковка. Подходит для проведения мероприятий и торжеств.",
                ShortDescription = "Гостиничный комплекс с рестораном и банкетным залом",
                Address = "Йошкар-Ола, 2,2 км от центра",
                Latitude = 56.6255,
                Longitude = 47.8930,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/de2/520_332_2619711fa078991f0a23d032687646b21/de270065b123b394fb72631cdd718d72.webp",
                Stars = 3,
                Rating = 4.1,
                PriceFrom = 2500,
                Phone = "+7 (8362) 46-46-46",
                Website = "",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = true
            },
            new Hotel
            {
                Name = "Загородный отель Magic Club 4*",
                Description = "Загородный отель Magic Club 4* — четырёхзвёздочный загородный отель в 40 км от Йошкар-Олы в Звениговском районе. Расположен в живописном месте среди леса. Идеальное место для отдыха на природе с комфортом. Ресторан, бассейн, спа-зона, конференц-зал. Организация корпоративов и свадеб.",
                ShortDescription = "Четырёхзвёздочный загородный отель среди леса",
                Address = "Звениговский район, 40 км от Йошкар-Олы",
                Latitude = 56.4800,
                Longitude = 48.0200,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/dda/520_332_2619711fa078991f0a23d032687646b21/lun3cunring1s2i1ypow55ocrspecmcp.jpg",
                Stars = 4,
                Rating = 4.7,
                PriceFrom = 6000,
                Phone = "+7 (8362) 35-35-35",
                Website = "",
                HasWifi = true,
                HasParking = true,
                HasPool = true,
                HasRestaurant = true
            },
            new Hotel
            {
                Name = "Гостиница «Замок Шереметева»",
                Description = "Гостиница «Замок Шереметева» расположена в Юринском районе, в 210 км от Йошкар-Олы, на территории знаменитого замка Шереметева — усадебного комплекса XIX века на берегу Волги. Уникальная возможность остановиться в настоящем замке с богатой историей. Экскурсии по замку, прогулки по парку, виды на Волгу.",
                ShortDescription = "Уникальная гостиница в замке XIX века на берегу Волги",
                Address = "Юринский район, пос. Юрино, 210 км от Йошкар-Олы",
                Latitude = 56.2960,
                Longitude = 46.3040,
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/07f/520_332_2619711fa078991f0a23d032687646b21/jk2b23ednd3fad9e5u4z2m40682xelru.jpg",
                Stars = 3,
                Rating = 4.4,
                PriceFrom = 3500,
                Phone = "+7 (83644) 3-22-45",
                Website = "",
                HasWifi = true,
                HasParking = true,
                HasPool = false,
                HasRestaurant = true
            }
        );
    }

    private static void SeedRestaurants(AppDbContext db)
    {
        db.Restaurants.AddRange(
            new Restaurant
            {
                Name = "Тёплая речка",
                Description = "Трактир «Тёплая речка» — ресторан №1 в Йошкар-Оле по версии Restaurant Guru с более чем 4300 оценок. Специализируется на русской и марийской кухне. Здесь обязательно стоит попробовать холодец, грибы, утку, микс подкоголей (марийские вареники с мясом щуки, капустой, картофелем, уткой и мясом кабана). Потрясающие трёхслойные блины и фирменный борщ в хлебе. Уютная территория с верандой, живая музыка, удобное расположение.",
                ShortDescription = "Лучший ресторан Йошкар-Олы с русской и марийской кухней",
                Address = "ул. Красноармейская Слобода, 61, Йошкар-Ола",
                Latitude = 56.644057,
                Longitude = 47.916397,
                ImageUrl = "https://img02.restaurantguru.ru/c765-exterior-Teplaya-rechka.jpg",
                Cuisine = "Русская",
                PriceRange = "₽₽₽",
                Rating = 4.8,
                Phone = "+7 (8362) 49-54-59",
                WorkingHours = "12:00–23:00",
                HasDelivery = true
            },
            new Restaurant
            {
                Name = "Мари",
                Description = "Ресторан марийской кухни «Мари» — №2 из 314 ресторанов Йошкар-Олы с почти 2400 оценок. Специализируется на аутентичной марийской и русской кухне: подкогыльо (марийские вареники), команмелна (трёхслойные блины), уяча (национальный десерт), кровяная колбаса, печной хлеб. Пиво «Медведевское» местного производства. Уютная атмосфера с элементами марийского орнамента в интерьере, культурная программа по выходным.",
                ShortDescription = "Аутентичный ресторан марийской кухни №2 в городе",
                Address = "ул. Подольских Курсантов, 5, Йошкар-Ола",
                Latitude = 56.650429,
                Longitude = 47.868426,
                ImageUrl = "https://img02.restaurantguru.ru/ce25-Mari-Yoshkar-Ola-food.jpg",
                Cuisine = "Марийская",
                PriceRange = "₽₽",
                Rating = 4.8,
                Phone = "+7 (8362) 30-45-04",
                WorkingHours = "11:00–22:00",
                HasDelivery = true
            },
            new Restaurant
            {
                Name = "Камелот",
                Description = "Ресторан «Камелот» — №1 среди итальянских ресторанов Йошкар-Олы с почти 2900 оценок и рейтингом 4.7 на Google. Уникальный интерьер в стиле средневекового замка с витражами, мечами и рыцарской атрибутикой. Средиземноморская и европейская кухня: салат с тунцом, уха, рибай, паста, ризотто, яблочный пирог. Идеально для романтического ужина или торжества.",
                ShortDescription = "Ресторан в стиле средневекового замка со средиземноморской кухней",
                Address = "бул. Победы, 5, Йошкар-Ола",
                Latitude = 56.636962,
                Longitude = 47.883399,
                ImageUrl = "https://img02.restaurantguru.ru/c6cd-Camelot-Yoshkar-Ola-facade.jpg",
                Cuisine = "Европейская",
                PriceRange = "₽₽₽",
                Rating = 4.7,
                Phone = "+7 (8362) 42-14-71",
                WorkingHours = "11:00–00:00",
                HasDelivery = true
            },
            new Restaurant
            {
                Name = "Сахли",
                Description = "Ресторан грузинской кухни «Сахли» — №4 из 314 ресторанов Йошкар-Олы. «Сахли» в переводе означает «дом», и здесь действительно тепло и уютно. Обязательно закажите хачапури по-аджарски, хинкали, чанахи, сациви, долму, кебаб и харчо. Домашнее грузинское вино и пиво. Живая музыка, роскошный интерьер, гостеприимная атмосфера.",
                ShortDescription = "Лучший грузинский ресторан города — тепло, уютно и вкусно",
                Address = "ул. Транспортная, 4, Йошкар-Ола",
                Latitude = 56.648844,
                Longitude = 47.854985,
                ImageUrl = "https://img02.restaurantguru.ru/cccd-Sahli-Yoshkar-Ola-dishes.jpg",
                Cuisine = "Грузинская",
                PriceRange = "₽₽₽",
                Rating = 4.8,
                Phone = "+7 (967) 758-40-40",
                WorkingHours = "12:00–23:00",
                HasDelivery = true
            },
            new Restaurant
            {
                Name = "Онар",
                Description = "Ресторан «Онар» — №6 из 314 ресторанов Йошкар-Олы, расположен неподалёку от Царевококшайского Кремля при одноимённом отеле. Русская и европейская кухня: бургеры, стейки, борщ, свиные рёбрышки, паста с креветками. Превосходные десерты — тирамису и шоколадный фондан. Веранда на свежем воздухе, вежливый персонал, доступные цены.",
                ShortDescription = "Ресторан у Кремля с отличными стейками и десертами",
                Address = "ул. Советская, 123А, Йошкар-Ола",
                Latitude = 56.6350,
                Longitude = 47.8870,
                ImageUrl = "https://img02.restaurantguru.ru/c1bf-Onar-Yoshkar-Ola-dishes.jpg",
                Cuisine = "Русская",
                PriceRange = "₽₽",
                Rating = 4.7,
                Phone = "+7 (996) 115-13-16",
                WorkingHours = "11:00–23:00",
                HasDelivery = false
            },
            new Restaurant
            {
                Name = "Старый Георг",
                Description = "Пивной ресторан «Старый Георг» — №1 из 279 пабов и баров Йошкар-Олы с почти 2700 оценок. Русская кухня с акцентом на пиво: борщ, рибай, сало, бефстроганов, бургеры, фиш-энд-чипс. Отличная выпечка — сырники, штрудель, печенье макарон. Широкий выбор бочкового пива, крафтового эля и кваса. Живая музыка, трансляции спортивных матчей, детское меню.",
                ShortDescription = "Лучший паб города с крафтовым пивом и живой музыкой",
                Address = "ул. Свердлова, 36А, Йошкар-Ола",
                Latitude = 56.641844,
                Longitude = 47.866889,
                ImageUrl = "https://img02.restaurantguru.ru/c93e-Old-George-exterior.jpg",
                Cuisine = "Европейская",
                PriceRange = "₽₽",
                Rating = 4.8,
                Phone = "+7 (8362) 72-44-44",
                WorkingHours = "12:00–00:00",
                HasDelivery = true
            },
            new Restaurant
            {
                Name = "Mon Tresor",
                Description = "Ресторан «Mon Tresor» — №16 из 314 ресторанов Йошкар-Олы с почти 1400 оценок. Авторская европейская кухня: рибай, кальмары, том ям, сибас, медальоны из говядины, лосось. Отличные десерты — мороженое и фирменные авторские блюда. Живая музыка и вокал по вечерам. Уютный интерьер, приятная атмосфера, бронирование столиков.",
                ShortDescription = "Авторская европейская кухня с живой музыкой",
                Address = "ул. Кирова, 9Б, Йошкар-Ола",
                Latitude = 56.631197,
                Longitude = 47.928513,
                ImageUrl = "https://img02.restaurantguru.ru/c40a-food-Mon-Tresor.jpg",
                Cuisine = "Европейская",
                PriceRange = "₽₽₽",
                Rating = 4.7,
                Phone = "+7 (8362) 77-74-07",
                WorkingHours = "12:00–00:00",
                HasDelivery = true
            },
            new Restaurant
            {
                Name = "Гости",
                Description = "Ресторан «Гости» — №13 из 314 ресторанов Йошкар-Олы с почти 1300 оценок. Душевный ресторан с европейской кухней: борщ, крем-суп из шампиньонов, свиные рёбрышки, телячьи щёчки с пюре, салат «Цезарь», бефстроганов. Фирменные десерты — шоколадный фондан, штрудель с грушей, мороженое. Вино, бочковое пиво, коньяк. Детское меню, профессиональный сервис.",
                ShortDescription = "Душевный ресторан с европейской кухней и фонданом",
                Address = "ул. Пушкина, 15, Йошкар-Ола",
                Latitude = 56.632508,
                Longitude = 47.893278,
                ImageUrl = "https://img02.restaurantguru.ru/cc86-food-Gosti12-1.jpg",
                Cuisine = "Европейская",
                PriceRange = "₽₽₽",
                Rating = 4.5,
                Phone = "+7 (937) 939-05-39",
                WorkingHours = "12:00–23:00",
                HasDelivery = true
            },
            new Restaurant
            {
                Name = "BARAШЕК",
                Description = "Кафе восточной кухни «BARAШЕК» — №12 из 314 ресторанов Йошкар-Олы с почти 1500 оценок, расположено в центре города вблизи набережной Малой Кокшаги. Плов с бараниной в казане по старинным рецептам, шашлык, люля-кебаб, самса с мясом и тыквой, чучвара (маленькие пельмешки ручной лепки), манты, шурпа, лагман. Лепёшки, десерты, ягодные морсы. Бизнес-ланчи по будням.",
                ShortDescription = "Восточная кухня с пловом в казане и самсой у набережной",
                Address = "бул. Чавайна, 23А, 2-й этаж, Йошкар-Ола",
                Latitude = 56.631415,
                Longitude = 47.911661,
                ImageUrl = "https://img02.restaurantguru.ru/c9/Restaurant-Barashek-food.jpg",
                Cuisine = "Восточная",
                PriceRange = "₽₽",
                Rating = 4.8,
                Phone = "+7 (8362) 36-99-99",
                WorkingHours = "11:00–23:00",
                HasDelivery = true
            },
            new Restaurant
            {
                Name = "Rubiton",
                Description = "Ресторан «Rubiton» — №14 из 314 ресторанов Йошкар-Олы при одноимённом отеле. Смешанная европейская и итальянская кухня с акцентом на морепродукты: стейки, лосось-гриль, ризотто, моллюски, том ям, денвер в соусе демиглас. Современный интерьер, веранда, Wi-Fi. Завтраки, бизнес-ланчи до 16:00. Средний чек около 2 000 руб.",
                ShortDescription = "Ресторан при отеле с европейской кухней и морепродуктами",
                Address = "ул. Карла Либкнехта, 102, Йошкар-Ола",
                Latitude = 56.629231,
                Longitude = 47.935674,
                ImageUrl = "https://img02.restaurantguru.ru/c1f5-Restaurant-Rubiton-interior.jpg",
                Cuisine = "Европейская",
                PriceRange = "₽₽₽",
                Rating = 4.8,
                Phone = "+7 (902) 465-00-05",
                WorkingHours = "11:00–23:00",
                HasDelivery = false
            }
        );
    }

    private static void SeedEvents(AppDbContext db)
    {
        db.Events.AddRange(
            new Event
            {
                Title = "Пеледыш пайрем — Праздник цветов",
                Description = "Всероссийский фестиваль национальной культуры «Пеледыш пайрем» — марийский праздник цветов, символизирующий весенне-летнее возрождение природы. Красочное шествие по центральным улицам, концертная программа фольклорных коллективов, ярмарка мастеров, мастер-классы по марийским ремёслам.",
                ShortDescription = "Главный марийский национальный праздник — фестиваль цветов",
                Location = "Центральные улицы Йошкар-Олы",
                Address = "Йошкар-Ола",
                StartDate = new DateTime(2026, 6, 19, 10, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 6, 20, 22, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/eb7/1392_1094_2619711fa078991f0a23d032687646b21/qofcystbi7wvztcsktmcn09e3afl1a45.webp",
                Category = "Национальные праздники",
                IsFree = true,
                Price = null
            },
            new Event
            {
                Title = "Гастрофестиваль «Йошка Еш» 2026",
                Description = "Главное кулинарное событие лета! Шеф-повара республики и страны представят фестивальное меню, марийский сыр, мёд, мясные деликатесы. Мастер-классы от шефов, живая музыка, ремесленные ряды, детское пространство и спортивная зона. В 2025 году — более 30 000 посетителей.",
                ShortDescription = "Главный кулинарный фестиваль Марий Эл с 30 000+ гостей",
                Location = "Йошкар-Ола",
                Address = "Йошкар-Ола",
                StartDate = new DateTime(2026, 7, 18, 10, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 7, 19, 22, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/39e/1392_1094_2619711fa078991f0a23d032687646b21/oynijg42i9fpjctxxuu5lv3pkm33vbpj.webp",
                Category = "Гастрономия",
                IsFree = true,
                Price = null
            },
            new Event
            {
                Title = "Шествие Дедов Морозов",
                Description = "Традиционное Шествие Дедов Морозов открывает фестиваль «Марийская зима». Десятки Дедов Морозов и Снегурочек пройдут по центральным улицам города от площади Никонова через бульвар Чавайна и Центральный парк до площади Ленина. Кульминация — зажжение Главной ёлки.",
                ShortDescription = "Сказочное шествие с зажжением Главной ёлки города",
                Location = "Площадь Никонова — Площадь Ленина",
                Address = "пл. Никонова, Йошкар-Ола",
                StartDate = new DateTime(2026, 12, 12, 15, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 12, 12, 20, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/712/1392_1094_2619711fa078991f0a23d032687646b21/q8ezqj1tgu0m6d6il08kcvavpv9t4oc4.webp",
                Category = "Городские праздники",
                IsFree = true,
                Price = null
            },
            new Event
            {
                Title = "Рок-фестиваль «Звезда по имени Солнце»",
                Description = "Рок-фестиваль, посвящённый Виктору Цою и группе «Кино». Живые выступления рок-групп города и региона, кавер-версии и авторские прочтения. Площадка перед ЦКиД «Звёздный» превращается в открытую рок-сцену.",
                ShortDescription = "Рок-фестиваль памяти Виктора Цоя с живой музыкой",
                Location = "ЦКиД «Звёздный»",
                Address = "г. Волжск",
                StartDate = new DateTime(2026, 8, 15, 17, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 8, 15, 23, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/bdf/1392_1094_2619711fa078991f0a23d032687646b21/vmkvckv6mtb4u4ele1ru7d1w0snjv6fm.webp",
                Category = "Фестивали",
                IsFree = true,
                Price = null
            },
            new Event
            {
                Title = "Ночь музеев",
                Description = "Ежегодная всероссийская акция, когда музеи города открыты до позднего вечера. Бесплатное посещение экспозиций, квесты, мастер-классы, лекции, концерты на музейных площадках.",
                ShortDescription = "Бесплатное ночное посещение музеев города",
                Location = "Музеи Йошкар-Олы",
                Address = "Йошкар-Ола, различные площадки",
                StartDate = new DateTime(2026, 5, 16, 18, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 5, 17, 2, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/6ba/1392_1094_2619711fa078991f0a23d032687646b21/4abhfiqto1lv23tajpo6tsdubd8vqjvb.webp",
                Category = "Культура",
                IsFree = true,
                Price = null
            }
        );
    }

    private static void SeedEventsBatch2(AppDbContext db)
    {
        db.Events.AddRange(
            new Event
            {
                Title = "Фестиваль «Летние сезоны»",
                Description = "Фестиваль балетного искусства на сцене Марийского театра оперы и балета. Выступления ведущих солистов и трупп из Москвы, Санкт-Петербурга и других городов. Классический и современный балет.",
                ShortDescription = "Балетный фестиваль с участием ведущих солистов страны",
                Location = "Театр оперы и балета им. Э. Сапаева",
                Address = "пл. Ленина, 1, Йошкар-Ола",
                StartDate = new DateTime(2026, 7, 1, 18, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 7, 15, 22, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/2bf/1280_960_1619711fa078991f0a23d032687646b21/5c2r90tp2n0h33nldmovswuci2hkprdu.webp",
                Category = "Фестивали",
                IsFree = false,
                Price = 600
            },
            new Event
            {
                Title = "Фестиваль исторической реконструкции «Наследие»",
                Description = "Межрегиональный фестиваль с рыцарскими турнирами, средневековыми мастер-классами, историческими лагерями и показательными боями. Ярмарка ремёсел, стрельба из лука, средневековая кухня.",
                ShortDescription = "Рыцарские турниры и средневековые мастер-классы",
                Location = "Царевококшайский кремль",
                Address = "ул. Вознесенская, 49, Йошкар-Ола",
                StartDate = new DateTime(2026, 8, 22, 10, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 8, 23, 20, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/f37/1392_1094_2619711fa078991f0a23d032687646b21/43wq7xt7ftdpc2jwbzadap7u7wrr4s55.webp",
                Category = "Фестивали",
                IsFree = true,
                Price = null
            },
            new Event
            {
                Title = "Народные гуляния «Светлая Пасха»",
                Description = "Праздничные мероприятия на центральных площадках города. Пасхальная ярмарка, выставка, мастер-классы по росписи яиц, концертная программа хоровых коллективов.",
                ShortDescription = "Пасхальные гуляния с ярмаркой и мастер-классами",
                Location = "Патриаршая площадь",
                Address = "Патриаршая площадь, Йошкар-Ола",
                StartDate = new DateTime(2026, 4, 12, 10, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 4, 12, 20, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/82c/1392_1094_2619711fa078991f0a23d032687646b21/zntzdp9oryojan9388q034iw6z30lczl.webp",
                Category = "Городские праздники",
                IsFree = true,
                Price = null
            },
            new Event
            {
                Title = "Край звонких гуслей",
                Description = "Фестиваль марийской народной музыки и инструментального искусства. Выступления гусляров, ансамблей народных инструментов. Мастер-классы по игре на гуслях и кÿсле (марийских гуслях).",
                ShortDescription = "Фестиваль марийской народной музыки и гусляров",
                Location = "Парк культуры и отдыха",
                Address = "ул. Первомайская, 43, Йошкар-Ола",
                StartDate = new DateTime(2026, 9, 5, 12, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 9, 6, 20, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/eb9/1280_854_1619711fa078991f0a23d032687646b21/u3nbvx70lvzcfuxdu2ic3xobvgr4z4eq.webp",
                Category = "Национальные праздники",
                IsFree = true,
                Price = null
            },
            new Event
            {
                Title = "Масленица в Йошкар-Оле",
                Description = "Народные гулянья на Масленицу на центральных площадках. Блины, чучело зимы, хороводы, перетягивание каната, бои мешками. Выступления фольклорных коллективов, ярмарка ремёсел.",
                ShortDescription = "Масленичные гулянья с блинами и сожжением чучела",
                Location = "Царевококшайский кремль",
                Address = "ул. Вознесенская, 49, Йошкар-Ола",
                StartDate = new DateTime(2027, 2, 22, 11, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2027, 2, 28, 18, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/19a/1024_586_1619711fa078991f0a23d032687646b21/4p4r30wfg7icg78tywb51tdrn9fl3ww5.webp",
                Category = "Городские праздники",
                IsFree = true,
                Price = null
            },
            new Event
            {
                Title = "Фестиваль «Пеледыш FEST: все краски отдыха»",
                Description = "Фестиваль отдыха и туризма с туристическими мастер-классами, спортивными соревнованиями, концертной программой. Знакомство с туристическим потенциалом Марий Эл.",
                ShortDescription = "Фестиваль отдыха и туризма с мастер-классами",
                Location = "Центральный парк",
                Address = "ул. Первомайская, 43, Йошкар-Ола",
                StartDate = new DateTime(2026, 6, 20, 10, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 6, 21, 20, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/eb7/1392_1094_2619711fa078991f0a23d032687646b21/qofcystbi7wvztcsktmcn09e3afl1a45.webp",
                Category = "Фестивали",
                IsFree = true,
                Price = null
            },
            new Event
            {
                Title = "Фестиваль уличного кино",
                Description = "Показы лучших российских короткометражных фильмов под открытым небом. Голосование зрителей, встречи с режиссёрами, мастер-классы по кинопроизводству.",
                ShortDescription = "Показы короткометражек под открытым небом",
                Location = "Набережная Брюгге",
                Address = "наб. Брюгге, Йошкар-Ола",
                StartDate = new DateTime(2026, 8, 28, 20, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 8, 28, 23, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/bdf/1392_1094_2619711fa078991f0a23d032687646b21/vmkvckv6mtb4u4ele1ru7d1w0snjv6fm.webp",
                Category = "Культура",
                IsFree = true,
                Price = null
            },
            new Event
            {
                Title = "Фольклорный праздник «Земля предков»",
                Description = "Межрегиональный фольклорно-этнографический праздник с участием представителей финно-угорских народов. Народные обряды, песни, танцы, традиционная кухня и ремёсла.",
                ShortDescription = "Этнографический праздник финно-угорских народов",
                Location = "Этнографический музей под открытым небом",
                Address = "пос. Подолино, Республика Марий Эл",
                StartDate = new DateTime(2026, 7, 25, 10, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 7, 26, 20, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/6ba/1392_1094_2619711fa078991f0a23d032687646b21/4abhfiqto1lv23tajpo6tsdubd8vqjvb.webp",
                Category = "Национальные праздники",
                IsFree = true,
                Price = null
            },
            new Event
            {
                Title = "День народного единства в Йошкар-Оле",
                Description = "Праздничные мероприятия: концертная программа, тематические выставки, спортивные состязания. Торжественное шествие, ярмарка на набережной.",
                ShortDescription = "Праздничный концерт, выставки и спортивные состязания",
                Location = "Площадь Оболенского-Ноготкова",
                Address = "пл. Оболенского-Ноготкова, Йошкар-Ола",
                StartDate = new DateTime(2026, 11, 4, 10, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 11, 4, 20, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/82c/1392_1094_2619711fa078991f0a23d032687646b21/zntzdp9oryojan9388q034iw6z30lczl.webp",
                Category = "Городские праздники",
                IsFree = true,
                Price = null
            },
            new Event
            {
                Title = "Фестиваль театров финно-угорских народов «Майатул»",
                Description = "Международный фестиваль с участием театральных коллективов финно-угорских народов из России, Финляндии, Эстонии и Венгрии. Спектакли, творческие лаборатории, дискуссии.",
                ShortDescription = "Международный театральный фестиваль финно-угорских народов",
                Location = "Марийский национальный театр драмы",
                Address = "пл. Ленина, 2, Йошкар-Ола",
                StartDate = new DateTime(2026, 10, 10, 18, 0, 0, DateTimeKind.Utc),
                EndDate = new DateTime(2026, 10, 15, 22, 0, 0, DateTimeKind.Utc),
                ImageUrl = "https://visit-mariel.ru/upload/resize_cache/iblock/2bf/1280_960_1619711fa078991f0a23d032687646b21/5c2r90tp2n0h33nldmovswuci2hkprdu.webp",
                Category = "Фестивали",
                IsFree = false,
                Price = 400
            }
        );
    }
}
