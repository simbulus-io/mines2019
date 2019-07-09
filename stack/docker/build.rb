#!/usr/bin/env ruby

require 'erubis'
require 'fileutils'
require 'socket'

def main(opts)
  script_dir = File.expand_path(__dir__)

  Dir.chdir(script_dir)

  my_ip_address = ''
  Socket.ip_address_list.each do |addr_info|
    addr = addr_info.ip_address
    my_ip_address = addr if addr =~ /^10\./
  end
  raise "couldn't figure out my ip address" if my_ip_address.length==0

  for_production = opts.prod
  nginx_port = opts.port
  file_share = opts.share
  
  templates = %w( nginx/nginx.conf.erb  docker-compose.yml.erb )

  templates.each do |tmplt|
    src = script_dir+"/"+tmplt
    tgt = src.sub('.erb','')
    erb = File.read(src)
    result = Erubis::Eruby.new(erb).result(binding())
    File.open(tgt, "w") { |f| f.puts(result) }
  end

end



if __FILE__==$0

  require 'optparse'
  require 'ostruct'

  opts = OpenStruct.new
  opts[:port] = '80'
  opts[:share] = "#{ENV['HOME']}/shared"
  
  OptionParser.new do |parser|
    parser.on('--prod',
              'serve app/dist rather than webpack dev_server'
             ) { |o| opts.prod = o }

    parser.on('-p PORT',
              '--port PORT',
              "set the entry port for nginx (default: #{opts.port})"
             ) { |o| opts.port = o }

    parser.on('--share DIR',
              "location for the file share (default: #{opts.share})"
             ) { |o| opts.share = o }


    opts.usage = parser.help
  end.parse!

  main(opts)
end
