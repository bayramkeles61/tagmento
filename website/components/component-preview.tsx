import ComponentCard from "@/components/component-card";
import { getComponentsByNames } from '@/lib/utils';
import { getCategory } from "@/config/components";
import { notFound } from "next/navigation";
import ComponentLoader from "./component-loader-server";
import ComponentDetails from "./component-details";

export function ComponentPreview({ componentName = "comp-01" }) {
    const category = getCategory('input-tags')

    if (!category) {
        notFound();
    }

    const components = getComponentsByNames(category.components.map((item) => item.name));

    const component = components.find((c) => c.name === componentName)
    if (!component) {
        notFound();
    }
    return (
        <div className="w-full flex flex-wrap">
            <ComponentCard key={component.name} component={component}>
                <ComponentLoader component={component} />
                <ComponentDetails component={component} />
            </ComponentCard>
        </div>
    );
}
