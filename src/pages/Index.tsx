import { useState } from "react";
import Icon from "@/components/ui/icon";

const steps = [
  {
    id: 1,
    icon: "KeyRound",
    title: "Получение доступов",
    subtitle: "Логины и пароли к системам",
    description:
      "Вы получите учётные данные для входа во все корпоративные системы: почта, CRM, мессенджеры, внутренний портал и прочие сервисы.",
    systems: ["Корпоративная почта", "CRM-система", "1С / ERP", "Slack / Teams", "VPN"],
    contact: {
      name: "Алексей Сидоров",
      role: "Системный администратор",
      email: "it@company.ru",
      phone: "+7 (900) 123-45-01",
    },
    color: "#C8D8E8",
    duration: "День 1",
  },
  {
    id: 2,
    icon: "Monitor",
    title: "Выдача оборудования",
    subtitle: "Ноутбук, монитор, телефон, периферия",
    description:
      "Вам подготовят рабочее оборудование: ноутбук с установленным ПО, монитор, рабочий телефон и необходимые аксессуары.",
    systems: ["Ноутбук", "Монитор", "Корпоративный телефон", "Клавиатура и мышь", "Гарнитура"],
    contact: {
      name: "Марина Козлова",
      role: "Офис-менеджер",
      email: "office@company.ru",
      phone: "+7 (900) 123-45-02",
    },
    color: "#D4E8D4",
    duration: "День 1",
  },
  {
    id: 3,
    icon: "Building2",
    title: "Рабочее место",
    subtitle: "Офис, ключи, карты доступа",
    description:
      "Вас проводят на рабочее место, выдадут ключи от офиса и карту доступа в здание, расскажут про переговорные и общие зоны.",
    systems: ["Пропуск в здание", "Ключ от офиса", "Карта парковки", "Место в open space"],
    contact: {
      name: "Дмитрий Петров",
      role: "Административный директор",
      email: "admin@company.ru",
      phone: "+7 (900) 123-45-03",
    },
    color: "#E8D4C8",
    duration: "День 1–2",
  },
  {
    id: 4,
    icon: "FileText",
    title: "Кадровые документы",
    subtitle: "Оформление и политики компании",
    description:
      "HR-специалист ознакомит вас с трудовым договором, внутренними регламентами, кодексом корпоративной этики и другими ключевыми документами.",
    systems: ["Трудовой договор", "Должностная инструкция", "Кодекс этики", "Регламент отпусков", "Структура компании"],
    contact: {
      name: "Ольга Новикова",
      role: "HR-менеджер",
      email: "hr@company.ru",
      phone: "+7 (900) 123-45-04",
    },
    color: "#E8E4C8",
    duration: "День 2–3",
  },
  {
    id: 5,
    icon: "ShieldCheck",
    title: "Информационная безопасность",
    subtitle: "Правила ИБ и соглашения",
    description:
      "Специалист по ИБ проведёт инструктаж по правилам работы с данными, расскажет о политике паролей и попросит подписать соглашение о конфиденциальности.",
    systems: ["Инструктаж по ИБ", "Политика паролей", "NDA / Соглашение", "Правила работы с данными"],
    contact: {
      name: "Игорь Захаров",
      role: "Специалист по ИБ",
      email: "security@company.ru",
      phone: "+7 (900) 123-45-05",
    },
    color: "#D4C8E8",
    duration: "День 3",
  },
  {
    id: 6,
    icon: "Users",
    title: "Знакомство с командой",
    subtitle: "Встречи с руководителем и коллегами",
    description:
      "Серия коротких встреч: 1:1 с непосредственным руководителем, знакомство с командой отдела и общий welcome-звонок с коллегами.",
    systems: ["1:1 с руководителем", "Встреча с командой", "Welcome-звонок", "Экскурсия по офису"],
    contact: {
      name: "Елена Громова",
      role: "Руководитель отдела",
      email: "manager@company.ru",
      phone: "+7 (900) 123-45-06",
    },
    color: "#E8C8D4",
    duration: "День 4–5",
  },
];

export default function Index() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const toggleComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleStep = (id: number) => {
    setActiveStep((prev) => (prev === id ? null : id));
  };

  const progress = Math.round((completed.length / steps.length) * 100);

  return (
    <div
      className="min-h-screen font-golos"
      style={{ background: "#F7F6F3", color: "#1A1A1A" }}
    >
      <style>{`
        .step-card {
          background: #FFFFFF;
          border: 1px solid #E0DDD6;
          border-radius: 12px;
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .step-card:hover {
          border-color: #C0BDB6;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          transform: translateY(-1px);
        }
        .step-card.active {
          border-color: #1A1A1A;
          box-shadow: 0 6px 32px rgba(0,0,0,0.1);
        }
        .step-card.done {
          background: #FAFAF8;
          opacity: 0.72;
        }
        .icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .check-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1.5px solid #E0DDD6;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .check-btn:hover {
          border-color: #2D7D4F;
          background: #e8f5ed;
        }
        .check-btn.checked {
          background: #2D7D4F;
          border-color: #2D7D4F;
        }
        .detail-panel {
          animation: expand-panel 0.3s ease-out forwards;
        }
        @keyframes expand-panel {
          from { opacity: 0; max-height: 0; overflow: hidden; }
          to { opacity: 1; max-height: 700px; overflow: visible; }
        }
        .onb-tag {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          background: #F0EFE9;
          color: #8A8A8A;
          border: 1px solid #E0DDD6;
          white-space: nowrap;
        }
        .contact-link {
          color: #8A8A8A;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.15s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .contact-link:hover { color: #1A1A1A; }
        @keyframes card-in {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-animate {
          animation: card-in 0.4s ease-out forwards;
          opacity: 0;
        }
        .progress-bar-fill {
          height: 100%;
          background: #1A1A1A;
          border-radius: 4px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .write-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          color: #1A1A1A;
          background: #FFFFFF;
          border: 1px solid #E0DDD6;
          border-radius: 8px;
          padding: 7px 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .write-btn:hover {
          background: #1A1A1A;
          color: #FFFFFF;
          border-color: #1A1A1A;
        }
      `}</style>

      {/* Header */}
      <header className="pt-14 pb-8 px-6 max-w-2xl mx-auto">
        <p
          className="text-xs font-medium mb-4"
          style={{
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#8A8A8A",
          }}
        >
          Путь нового сотрудника
        </p>
        <h1
          className="font-cormorant text-5xl font-medium leading-tight mb-3"
          style={{ color: "#1A1A1A" }}
        >
          Добро пожаловать
          <br />
          <span className="italic">в команду</span>
        </h1>
        <p className="text-base leading-relaxed max-w-md" style={{ color: "#8A8A8A" }}>
          Здесь собраны все шаги, которые нужно пройти в первые дни. Отмечайте выполненные — и двигайтесь вперёд уверенно.
        </p>
      </header>

      {/* Progress */}
      <div className="px-6 max-w-2xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm" style={{ color: "#8A8A8A" }}>
            Прогресс онбординга
          </span>
          <span className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>
            {completed.length} из {steps.length}
          </span>
        </div>
        <div
          className="h-[2px] w-full rounded-full overflow-hidden"
          style={{ background: "#E0DDD6" }}
        >
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        {completed.length === steps.length && (
          <p
            className="mt-3 text-sm font-medium flex items-center gap-2"
            style={{ color: "#2D7D4F" }}
          >
            <Icon name="PartyPopper" size={15} />
            Онбординг завершён — добро пожаловать в команду!
          </p>
        )}
      </div>

      {/* Steps */}
      <main className="px-6 max-w-2xl mx-auto pb-20">
        <div className="flex flex-col gap-0">
          {steps.map((step, index) => {
            const isCompleted = completed.includes(step.id);
            const isActive = activeStep === step.id;

            return (
              <div key={step.id} className="relative">
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div
                    style={{
                      width: "1px",
                      height: "16px",
                      background: "#E0DDD6",
                      marginLeft: "27px",
                    }}
                  />
                )}

                <div
                  className={`step-card card-animate${isActive ? " active" : ""}${isCompleted ? " done" : ""}`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                  onClick={() => toggleStep(step.id)}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-4 p-5">
                    <div className="icon-box" style={{ background: step.color }}>
                      {isCompleted ? (
                        <Icon name="Check" size={18} style={{ color: "#2D7D4F" }} />
                      ) : (
                        <Icon name={step.icon} size={18} style={{ color: "#1A1A1A" }} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <h3
                          className="font-semibold text-base"
                          style={{
                            color: isCompleted ? "#8A8A8A" : "#1A1A1A",
                            textDecoration: isCompleted ? "line-through" : "none",
                          }}
                        >
                          {step.title}
                        </h3>
                        <span className="onb-tag">{step.duration}</span>
                      </div>
                      <p className="text-sm truncate" style={{ color: "#8A8A8A" }}>
                        {step.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className={`check-btn${isCompleted ? " checked" : ""}`}
                        onClick={(e) => toggleComplete(step.id, e)}
                        title={isCompleted ? "Снять отметку" : "Отметить выполненным"}
                      >
                        {isCompleted && <Icon name="Check" size={13} style={{ color: "#fff" }} />}
                      </button>

                      <Icon
                        name={isActive ? "ChevronUp" : "ChevronDown"}
                        size={17}
                        style={{ color: "#8A8A8A" }}
                      />
                    </div>
                  </div>

                  {/* Expanded */}
                  {isActive && (
                    <div
                      className="detail-panel"
                      style={{ borderTop: "1px solid #E0DDD6" }}
                    >
                      <div className="p-5 pt-4">
                        <p className="text-sm leading-relaxed mb-5" style={{ color: "#8A8A8A" }}>
                          {step.description}
                        </p>

                        <div className="mb-5">
                          <p
                            className="text-xs font-semibold mb-3"
                            style={{
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "#8A8A8A",
                            }}
                          >
                            Что входит
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {step.systems.map((sys) => (
                              <span key={sys} className="onb-tag">
                                {sys}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p
                            className="text-xs font-semibold mb-3"
                            style={{
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "#8A8A8A",
                            }}
                          >
                            Ответственный
                          </p>
                          <div
                            className="rounded-xl p-4 flex items-start justify-between gap-4"
                            style={{ background: "#F7F6F3", border: "1px solid #E0DDD6" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div>
                              <p className="font-semibold text-sm mb-0.5" style={{ color: "#1A1A1A" }}>
                                {step.contact.name}
                              </p>
                              <p className="text-xs mb-3" style={{ color: "#8A8A8A" }}>
                                {step.contact.role}
                              </p>
                              <div className="flex flex-col gap-1.5">
                                <a
                                  href={`mailto:${step.contact.email}`}
                                  className="contact-link"
                                >
                                  <Icon name="Mail" size={13} />
                                  {step.contact.email}
                                </a>
                                <a
                                  href={`tel:${step.contact.phone}`}
                                  className="contact-link"
                                >
                                  <Icon name="Phone" size={13} />
                                  {step.contact.phone}
                                </a>
                              </div>
                            </div>
                            <button
                              className="write-btn"
                              onClick={() => {
                                window.location.href = `mailto:${step.contact.email}`;
                              }}
                            >
                              <Icon name="Send" size={12} />
                              Написать
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center"
        style={{ borderTop: "1px solid #E0DDD6" }}
      >
        <p className="text-xs" style={{ color: "#8A8A8A" }}>
          Остались вопросы? Напишите в HR —{" "}
          <a
            href="mailto:hr@company.ru"
            style={{ color: "#8A8A8A", textDecoration: "underline" }}
            className="hover:text-[#1A1A1A] transition-colors"
          >
            hr@company.ru
          </a>
        </p>
      </footer>
    </div>
  );
}