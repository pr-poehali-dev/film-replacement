import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/96798f99-2427-4bda-a31c-e83199c74b7b/files/0c908ecb-c2ac-45da-8029-1ca995a51af1.jpg';

const MATERIALS = [
  { id: 'matte', name: 'Матовая плёнка', price: 1200, desc: 'Базовая защита, антибликовая' },
  { id: 'glossy', name: 'Глянцевая плёнка', price: 1600, desc: 'Премиальный блеск, насыщенный цвет' },
  { id: 'metallic', name: 'Металлик', price: 2200, desc: 'Эффект металла, повышенная стойкость' },
  { id: 'armored', name: 'Бронеплёнка', price: 3400, desc: 'Ударопрочная, защита от взлома' },
];

const WORK_RATE = 7800;
const MIN_WORK_PRICE = 11700;

const Index = () => {
  const [width, setWidth] = useState('3');
  const [height, setHeight] = useState('2.5');
  const [material, setMaterial] = useState(MATERIALS[0].id);

  const total = useMemo(() => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const area = w * h;
    const mat = MATERIALS.find((m) => m.id === material) ?? MATERIALS[0];
    const film = area * mat.price;
    const rawWork = area * WORK_RATE;
    const work = Math.max(rawWork, MIN_WORK_PRICE);
    const isMinWork = work > rawWork && area > 0;
    return { area, film, work, isMinWork, sum: film + work };
  }, [width, height, material]);

  const fmt = (n: number) =>
    new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₽';

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground">
              <Icon name="Building2" size={20} />
            </div>
            <span className="font-display text-xl font-600 tracking-wide uppercase">
              ФасадМ
            </span>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-500 text-muted-foreground md:flex">
            <a href="#calc" className="transition-colors hover:text-foreground">Калькулятор</a>
            <a href="#advantages" className="transition-colors hover:text-foreground">Преимущества</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Контакты</a>
          </nav>
          <Button className="rounded-none font-500">
            <Icon name="Phone" size={16} className="mr-2" />
            Заказать звонок
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container grid gap-10 py-16 md:grid-cols-2 md:py-24 lg:items-center">
          <div className="animate-fade-in">
            <div className="mb-5 inline-flex items-center gap-2 border border-border bg-secondary px-3 py-1 text-xs font-600 uppercase tracking-wider text-muted-foreground">
              <span className="h-2 w-2 bg-accent" />
              Профессиональная замена с 2008 года
            </div>
            <h1 className="font-display text-4xl font-700 uppercase leading-[1.05] tracking-tight md:text-6xl">
              Замена плёнки <br />
              <span className="text-accent">для фасадов</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Точный демонтаж старого покрытия и установка новой архитектурной
              плёнки. Гарантия на материалы и работы — до 10 лет.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-none font-500">
                <a href="#calc">
                  Рассчитать стоимость
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none font-500">
                <a href="#advantages">Узнать больше</a>
              </Button>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                { v: '850+', l: 'объектов' },
                { v: '10 лет', l: 'гарантии' },
                { v: '7 дней', l: 'средний срок' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-700">{s.v}</div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: '150ms' }}>
            <div className="absolute -right-4 -top-4 h-full w-full border border-accent" />
            <img
              src={HERO_IMG}
              alt="Замена плёнки на фасаде здания"
              className="relative aspect-square w-full object-cover grayscale-[15%]"
            />
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calc" className="border-b border-border bg-secondary/40">
        <div className="container py-16 md:py-24">
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-600 uppercase tracking-widest text-accent">
              Онлайн-расчёт
            </span>
            <h2 className="mt-3 font-display text-3xl font-700 uppercase md:text-4xl">
              Калькулятор стоимости
            </h2>
            <p className="mt-3 text-muted-foreground">
              Укажите размеры участка и тип плёнки — стоимость пересчитается
              мгновенно.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* Inputs */}
            <div className="space-y-8 border border-border bg-card p-6 md:p-8 lg:col-span-3">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label className="mb-2 block text-xs font-600 uppercase tracking-wide text-muted-foreground">
                    Ширина, м
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="rounded-none font-display text-lg"
                  />
                </div>
                <div>
                  <Label className="mb-2 block text-xs font-600 uppercase tracking-wide text-muted-foreground">
                    Высота, м
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="rounded-none font-display text-lg"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-3 block text-xs font-600 uppercase tracking-wide text-muted-foreground">
                  Материал
                </Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {MATERIALS.map((m) => {
                    const active = material === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setMaterial(m.id)}
                        className={`flex flex-col items-start border p-4 text-left transition-all ${
                          active
                            ? 'border-accent bg-accent/5 ring-1 ring-accent'
                            : 'border-border bg-background hover:border-muted-foreground'
                        }`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <span className="font-600">{m.name}</span>
                          {active && <Icon name="Check" size={16} className="text-accent" />}
                        </div>
                        <span className="mt-1 text-xs text-muted-foreground">{m.desc}</span>
                        <span className="mt-2 font-display text-sm font-600">
                          {fmt(m.price)} / м²
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col justify-between bg-primary p-6 text-primary-foreground md:p-8 lg:col-span-2">
              <div>
                <span className="text-xs font-600 uppercase tracking-widest text-accent">
                  Предварительная смета
                </span>
                <div className="mt-6 space-y-4 text-sm">
                  <Row label="Площадь" value={`${total.area.toFixed(2)} м²`} />
                  <Row label="Плёнка" value={fmt(total.film)} />
                  <Row
                    label={total.isMinWork ? 'Работы (минимум)' : 'Работы (термовакуумный пресс)'}
                    value={fmt(total.work)}
                  />
                </div>
                {total.isMinWork && (
                  <div className="mt-4 flex items-start gap-2 border border-accent/40 bg-accent/10 p-3 text-xs text-primary-foreground/80">
                    <Icon name="Info" size={14} className="mt-0.5 shrink-0 text-accent" />
                    <span>
                      Минимальная стоимость работ — 11 700 ₽ (за объём до 1,5 м²
                      на термовакуумном прессе).
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-8 border-t border-white/15 pt-6">
                <div className="text-xs uppercase tracking-wide text-primary-foreground/60">
                  Итого
                </div>
                <div className="font-display text-4xl font-700 text-accent">
                  {fmt(total.sum)}
                </div>
                <Button
                  variant="secondary"
                  className="mt-5 w-full rounded-none font-500"
                >
                  <Icon name="FileText" size={16} className="mr-2" />
                  Оставить заявку на расчёт
                </Button>
                <p className="mt-3 text-center text-[11px] text-primary-foreground/50">
                  Расчёт предварительный. Точная смета — после замера.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="border-b border-border">
        <div className="container py-16 md:py-24">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-600 uppercase tracking-widest text-accent">
              Почему мы
            </span>
            <h2 className="mt-3 font-display text-3xl font-700 uppercase md:text-4xl">
              Работаем по стандарту
            </h2>
          </div>
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: 'ShieldCheck', t: 'Гарантия 10 лет', d: 'Официальные обязательства на материалы и монтаж.' },
              { icon: 'Ruler', t: 'Бесплатный замер', d: 'Выезд инженера и точный расчёт за наш счёт.' },
              { icon: 'Award', t: 'Сертифицированная плёнка', d: 'Только проверенные европейские производители.' },
              { icon: 'Clock', t: 'Сроки от 3 дней', d: 'Соблюдаем график, фиксируем в договоре.' },
            ].map((a) => (
              <div key={a.t} className="bg-card p-8">
                <div className="flex h-12 w-12 items-center justify-center bg-secondary text-accent">
                  <Icon name={a.icon} size={24} />
                </div>
                <h3 className="mt-5 font-display text-lg font-600 uppercase">{a.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-primary text-primary-foreground">
        <div className="container grid gap-8 py-16 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <h2 className="font-display text-3xl font-700 uppercase md:text-4xl">
              Нужен точный расчёт?
            </h2>
            <p className="mt-4 max-w-md text-primary-foreground/70">
              Оставьте контакты — инженер свяжется с вами, согласует выезд на
              замер и подготовит коммерческое предложение.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Icon name="Phone" size={18} className="text-accent" />
                +7 (495) 000-00-00
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Mail" size={18} className="text-accent" />
                info@fasadm.ru
              </div>
              <div className="flex items-center gap-3">
                <Icon name="MapPin" size={18} className="text-accent" />
                Москва, ул. Промышленная, 14
              </div>
            </div>
          </div>
          <div className="border border-white/15 bg-white/5 p-6 md:p-8">
            <div className="grid gap-4">
              <Input placeholder="Ваше имя" className="rounded-none border-white/20 bg-transparent text-primary-foreground placeholder:text-primary-foreground/40" />
              <Input placeholder="Телефон" className="rounded-none border-white/20 bg-transparent text-primary-foreground placeholder:text-primary-foreground/40" />
              <Button className="rounded-none bg-accent font-500 text-accent-foreground hover:bg-accent/90">
                Отправить заявку
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <Icon name="Building2" size={18} />
            <span className="font-display font-600 uppercase tracking-wide">ФасадМ</span>
          </div>
          <span>© 2026 ФасадМ. Замена плёнки для фасадов.</span>
        </div>
      </footer>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between border-b border-white/10 pb-3">
    <span className="text-primary-foreground/60">{label}</span>
    <span className="font-display font-600">{value}</span>
  </div>
);

export default Index;