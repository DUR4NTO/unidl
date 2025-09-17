import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PlatformCardProps {
  platform: string;
  name: string;
  icon: string;
  endpoint: string;
  description: string;
  exampleUrl: string;
  badge: string;
  badgeColor: string;
}

export function PlatformCard({ 
  platform, 
  name, 
  icon, 
  endpoint, 
  description, 
  exampleUrl, 
  badge, 
  badgeColor 
}: PlatformCardProps) {
  return (
    <Card className="bg-card border border-border overflow-hidden">
      <div className="bg-secondary px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className={`platform-icon ${platform}`} data-testid={`icon-${platform}`}>
            {icon}
          </div>
          <Badge variant="secondary" className="bg-accent text-accent-foreground" data-testid={`badge-${platform}-method`}>
            GET
          </Badge>
          <code className="font-mono" data-testid={`code-${platform}-endpoint`}>
            {endpoint}
          </code>
          <Badge className={badgeColor} data-testid={`badge-${platform}-feature`}>
            {badge}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-4" data-testid={`text-${platform}-description`}>
          {description}
        </p>
        <div className="code-block rounded-lg p-4 font-mono text-sm">
          <pre className="text-muted-foreground" data-testid={`code-${platform}-example`}>
            {`GET ${endpoint}?url=${exampleUrl}`}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
