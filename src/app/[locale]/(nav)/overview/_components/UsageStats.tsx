"use client";

import Section from "~/components/Section";
import ScrollArea from "~/components/ScrollArea";
import StatCard from "~/components/data/StatCard";
import useUsageStatsData from "~/hooks/data/use-usage-stats-data";
import i18next from "i18next";

function formatNumber(n: number) {
  return Intl.NumberFormat(i18next.language, {
    notation: "compact",
  }).format(n);
}

function formatHour(hour: number) {
  return new Intl.DateTimeFormat(i18next.language, {
    hour: "numeric",
  }).format(
    (() => {
      const date = new Date();
      date.setHours(hour);
      return date;
    })()
  );
}

export default function UsageStats() {
  const { networkSize, joinedGuilds, topHour } = useUsageStatsData();

  const data = [
    {
      value: joinedGuilds ? formatNumber(joinedGuilds) : "N/A",
      label: "server joined",
    },
    { value: "N/A", label: "received calls" },
    { value: "N/A", label: "opened notifs." },
    { value: topHour ? formatHour(topHour) : "N/A", label: "top hour" },
    {
      value: networkSize ? formatNumber(networkSize) : "N/A",
      label: "network size",
    },
  ];

  return (
    <Section title="Usage stats" href="/stats">
      <ScrollArea orientation="horizontal">
        <div className="flex">
          {data.map((stat, i) => (
            <StatCard key={i} {...stat} className="ml-2 shrink-0" />
          ))}
          <ScrollArea.Spacer />
        </div>
      </ScrollArea>
    </Section>
  );
}
